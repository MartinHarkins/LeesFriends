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

        this.db.events.find<Event>(filters).sort({date: -1}).exec(function (err, events) {
            if (err) {
                console.log('Could not get list of events', err);

                subject.next(ResponseWrapper.error<Event[]>(new Error('Could not get list of events', err)));
                subject.complete();
                return;
            }
            subject.next(ResponseWrapper.success(events));
            subject.complete();
        });

        return subject;
    }

    addEvent(event: Event): Observable<ResponseWrapper<Event>> {
        if (!event) {
            return Observable.of(ResponseWrapper.error<Event>(new Error('Event cannot be empty', event)));
        }

        const subject = new AsyncSubject<ResponseWrapper<Event>>();
        this.db.events.insert<Event>(event, (err, newEvent) => {
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
        console.log('event being updated', JSON.stringify(event));

        const subject = new AsyncSubject<ResponseWrapper<Event>>();
        this.db.events.update({_id: id}, event, {}, function (err) {
            if (err) {
                subject.next(ResponseWrapper.error<Event>(new Error('Could not update event for id' + id)));
                subject.complete();
                return;
            }

            subject.next(ResponseWrapper.success(event));
            subject.complete();
        });
        return subject;
    }

    isValidCredentials(username: string, password: string): Observable<ResponseWrapper<User>> {
        const subject = new AsyncSubject<ResponseWrapper<User>>();
            
        console.log('username', username);
        this.db.users.findOne<User>({
            username: username,
            password: this.hashPassword(password)
        }, (err, user: User) => {
            if (err) {
                console.log('Could not get list of events', err);
                subject.next(ResponseWrapper.error<User>(new Error('Could not match user', err)));
                subject.complete();
                return;
            }

            if (user == null) {
                subject.next(ResponseWrapper.error<User>(new Error('User not found.')));
                subject.complete();
                return;
            }

            subject.next(ResponseWrapper.success<User>(user));
            subject.complete();
        });
        return subject;
    }
}