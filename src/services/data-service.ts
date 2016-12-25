import * as express from 'express';

import {Event} from "../models/event";
import {Error} from "../common/error";

import * as bcrypt from 'bcrypt-nodejs';
import {EnvConfig} from "../core/env-config";
import {User} from "../models/user";

import {Observable, Subscriber, AsyncSubject} from "rxjs";
import {ResponseWrapper} from "../core/response-wrapper";
import {
    Db, MongoClient, Collection, MongoError, UpdateWriteOpResult, ObjectID,
    DeleteWriteOpResultObject
} from "mongodb";

class Collections {
    constructor(public events: Collection, public users: Collection) {
    }
}

export class DataService {
    private collections: Collections;

    constructor(private app: express.Application, private envConfig: EnvConfig) {
        const that = this;

        // local dev environment doesn't require the use of a user.
        const auth = this.envConfig.mongo.user ?
        this.envConfig.mongo.user + ':' + this.envConfig.mongo.password + '@' : '';

        const uri = 'mongodb://' +
            auth +
            this.envConfig.mongo.host + ':' +
            this.envConfig.mongo.port + '/' +
            this.envConfig.mongo.database;

        MongoClient.connect(uri, (err: MongoError, db: Db) => {
            if (err) {
                throw err;
            }

            that.collections = new Collections(
                db.collection('events'),
                db.collection('users'));

            that.initEvents(that.collections.events);

            that.initUsers(that.collections.users);
        });
    }

    private initEvents(eventsStore: Collection) {
        eventsStore.count({}, (err: MongoError, count: number) => {
            if (err) {
                console.error('Error getting event count', JSON.stringify(err));
                return;
            }

            if (count == 0) {
                eventsStore.insertMany([{
                    title: 'Title 1 up',
                    content: 'Content 1 up',
                    date: new Date(),
                    published: true,
                }, {
                    title: 'Title 2 up',
                    content: 'Content 2 up',
                    date: new Date(),
                    published: false
                }], function (err, newDocs) {
                    if (err) {
                        console.error('Error adding docs to database', JSON.stringify(err));
                    }

                    console.log('Added new documents', newDocs);
                })
            }
        });
    }

    private initUsers(usersStore: Collection) {
        const that = this;
        usersStore.count({}, (err: MongoError, count: number) => {
            if (err) {
                console.error('Error getting user count', JSON.stringify(err));
                return;
            }

            if (count == 0) {
                usersStore.insertOne(new User(
                    that.envConfig.defaultAdminAccount.username,
                    that.hashPassword(that.envConfig.defaultAdminAccount.password)));
            }
        });
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, this.envConfig.keys.bCryptSalt);
    }

    getEvents(opt?: {includeDrafts: boolean}): Observable<ResponseWrapper<Event[]>> {
        const subject = new AsyncSubject<ResponseWrapper<Event[]>>();

        let options = opt || {
                includeDrafts: false
            };

        let filters: any;
        filters = {};
        if (!options.includeDrafts) {
            filters = {
                published: true
            };
        }

        this.collections.events.find(filters).sort({date: -1})
            .toArray()
            .then((events: Event[]) => {
            console.log('sorted events:', JSON.stringify(events));
                subject.next(ResponseWrapper.success(events));
                subject.complete();
            }, (err: MongoError) => {
                console.log('Could not get list of events', err);

                subject.next(ResponseWrapper.error<Event[]>(new Error('Could not get list of events', err)));
                subject.complete();
            });

        return subject;
    }

    addEvent(event: Event): Observable<ResponseWrapper<Event>> {
        if (!event) {
            return Observable.of(ResponseWrapper.error<Event>(new Error('Event cannot be empty', event)));
        }

        // Convert date string to Date object
        event.date = new Date(event.date);

        const subject = new AsyncSubject<ResponseWrapper<Event>>();
        this.collections.events.insertOne(event, (err: MongoError, newEvent: Event) => {
            if (err) {
                return Observable.of(ResponseWrapper.error<Event>(new Error('Could not add event', err.message)));
            }

            subject.next(ResponseWrapper.success(newEvent));
            subject.complete();
        });
        return subject;
    }

    updateEvent(id: string, event: Event): Observable<ResponseWrapper<Event>> {
        if (!event) {
            return Observable.of(ResponseWrapper.error<Event>(new Error('Event cannot be empty', event)));
        }

        // TODO: find a better mechanism, this is hacky
        event._id = new ObjectID(event._id.toString());

        // Convert date string to Date object
        event.date = new Date(event.date);

        const subject = new AsyncSubject<ResponseWrapper<Event>>();
        this.collections.events.updateOne({_id: event._id}, event, (err: MongoError, res: UpdateWriteOpResult) => {
            console.log(JSON.stringify(res));
            if (res && res.result.n == 0) {
                console.log('Could not update event', res);
                subject.next(ResponseWrapper.error<Event>(new Error('Could not update event for id' + id)));
                subject.complete();
                return;
            }
            if (err) {
                console.log('Error updating event', err);
                subject.next(ResponseWrapper.error<Event>(new Error('Could not update event for id' + id)));
                subject.complete();
                return;
            }

            subject.next(ResponseWrapper.success(event));
            subject.complete();
        });
        return subject;
    }

    deleteEvent(id: string): Observable<ResponseWrapper<void>> {
        if (!id) {
            return Observable.of(ResponseWrapper.error<void>(new Error('Missing event id')));
        }

        // TODO: find a better mechanism, this is hacky
        const eventId = new ObjectID(id);

        const subject = new AsyncSubject<ResponseWrapper<void>>();
        this.collections.events.deleteOne({_id: eventId}, (err: MongoError, res: DeleteWriteOpResultObject) => {
            console.log(JSON.stringify(res));
            if (res && (res.result.ok == 0 || res.result.n == 0)) {
                console.log('Could not update event', res);
                subject.next(ResponseWrapper.error<void>(new Error('Could not update event for id' + id)));
                subject.complete();
                return;
            }
            if (err) {
                console.log('Error updating event', err);
                subject.next(ResponseWrapper.error<void>(new Error('Could not update event for id' + id)));
                subject.complete();
                return;
            }

            subject.next(ResponseWrapper.successNoResult());
            subject.complete();
        });
        return subject;
    }

    isValidCredentials(username: string, password: string): Observable<ResponseWrapper<User>> {
        const subject = new AsyncSubject<ResponseWrapper<User>>();

        this.collections.users.find({
            username: username,
            password: this.hashPassword(password)
        })
            .limit(1)
            .next()
            .then((user: User) => {
                    if (user == null) {
                        subject.next(ResponseWrapper.error<User>(new Error('User not found.')));
                        subject.complete();
                        return;
                    }

                    subject.next(ResponseWrapper.success<User>(user));
                    subject.complete();
                },
                (err: MongoError) => {
                    console.log('Could not get list of events', err);
                    subject.next(ResponseWrapper.error<User>(new Error('Could not match user', err)));
                    subject.complete();
                    return;

                });
        return subject;
    }
}