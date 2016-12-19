import * as DataStore from 'nedb';
import * as express from 'express';

import {Event} from "../models/event";
import {Error} from "../common/error";

import * as bcrypt from 'bcrypt-nodejs';
import {EnvConfig} from "../core/env-config";
import {User} from "../models/user";

import {Observable, Subscriber, AsyncSubject} from "rxjs/Rx";
import {ResponseWrapper} from "../core/response-wrapper";

class DB {
    constructor(public events: DataStore, public users: DataStore) {
    }
}

export class DataService {
    private db: DB;

    constructor(private app: express.Application, private envConfig: EnvConfig) {
        const that = this;
        const dbDir = this.getDbDirectory();

        const eventsStore = new DataStore({
            filename: dbDir + 'events.db'
        });
        const usersStore = new DataStore({
            filename: dbDir + 'users.db'
        });

        this.db = new DB(eventsStore, usersStore);

        eventsStore.loadDatabase(function (err) {
            if (err) {
                console.error('Error loading database', JSON.stringify(err));
                return;
            }

            that.initEvents(eventsStore);
        });
        usersStore.loadDatabase((err) => {
            if (err) {
                console.error('Error loading database', JSON.stringify(err));
                return;
            }

            that.initUsers(usersStore);
        });

    }


    private getDbDirectory() {
        let dbEnv = 'prod/';
        if (this.app.get('env') === 'development') {
            dbEnv = 'dev';
        } else {
            dbEnv = 'prod';
        }
        return 'db/' + dbEnv + '/';
    }

    private initEvents(eventsStore: DataStore) {
        eventsStore.count({}, function (err, count) {
            if (err) {
                console.error('Error getting event count', JSON.stringify(err));
                return;
            }

            if (count == 0) {
                eventsStore.insert([{
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

    private initUsers(usersStore: DataStore) {
        const that = this;
        usersStore.count({}, function (err, count) {
            if (err) {
                console.error('Error getting user count', JSON.stringify(err));
                return;
            }

            if (count == 0) {
                usersStore.insert<User>(new User(
                    that.envConfig.defaultAdminAccount.username,
                    that.hashPassword(that.envConfig.defaultAdminAccount.username)));
            }
        });
    }

    public hashPassword(password: string): string {
        return bcrypt.hashSync(this.envConfig.defaultAdminAccount.username, this.envConfig.bCryptSalt);
    }

    getEvents(opt?: {includeDrafts: boolean}): Observable<Event[]> {
        const subject = new AsyncSubject<Event[]>();

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

        this.db.events.find<Event>(filters).sort({date: -1}).exec(function (err, docs) {
            if (err) {
                console.log('Could not get list of events', err);

                throw new Error('Could not get list of events', err);
            }
            subject.next(docs);
            subject.complete();
        });

        return subject;
    }

    addEvent(event: Event): Observable<Event> {
        if (!event) {
            return Observable.throw(new Error('Event cannot be empty', event));
        }

        const subject = new AsyncSubject<Event>();
        this.db.events.insert<Event>(event, function (err, newDoc) {
            if (err) {
                throw new Error('Could not add event', err.message);
            }

            subject.next(newDoc);
            subject.complete();
        });
        return subject;
    }

    updateEvent(id: string, event: Event): Observable<Event> {
        if (!event) {
            return Observable.throw(new Error('Event cannot be empty', event));
        }
        console.log('event being updated', JSON.stringify(event));

        const subject = new AsyncSubject<Event>();
        this.db.events.update({_id: id}, event, {}, function (err) {
            if (err) {
                throw new Error('Could not update event for id' + id, err);
            }

            subject.next(event);
            subject.complete();
        });
        return subject;
    }

    isValidCredentials(username: string, password: string): Observable<ResponseWrapper<User>> {
        return Observable.create((subscriber: Subscriber<ResponseWrapper<User>>) => {
            console.log('username', username);
            this.db.users.findOne<User>({
                username: username,
                password: this.hashPassword(password)
            }, (err, user: User) => {
                if (err) {
                    console.log('Could not get list of events', err);
                    subscriber.next(ResponseWrapper.error<User>(new Error('Could not match user', err)));
                    subscriber.complete();
                    return;
                }

                if (user == null) {
                    subscriber.next(ResponseWrapper.error<User>(new Error('User not found.')));
                    subscriber.complete();
                    return;
                }

                subscriber.next(ResponseWrapper.success<User>(user));
                subscriber.complete();
            });
        }).catch(e => {
            console.log(JSON.stringify(e));
            return Observable.from(null);
        });

    }
}