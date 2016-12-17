import * as DataStore from 'nedb';
import * as express from 'express';

import * as Rx from '@reactivex/rxjs';
import {Event} from "../models/event";
import {Error} from "../common/error";

class DB {
    constructor(public events: DataStore) {
    }
}

export class DataService {
    private db: DB;

    constructor(private app: express.Application) {
        const that = this;
        const dbDir = this.getDbDirectory();

        const eventsStore = new DataStore({
            filename: dbDir + 'events.db'
        });

        this.db = new DB(eventsStore);

        eventsStore.loadDatabase(function (err) {
            if (err) {
                console.error('Error loading database', JSON.stringify(err));
                return;
            }

            that.initEvents(eventsStore);
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

    getEvents(opt?: {includeDrafts: boolean}): Rx.Observable<Event[]> {
        const subject = new Rx.AsyncSubject<Event[]>();

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

    addEvent(event: Event): Rx.Observable<Event> {
        if (!event) {
            return Rx.Observable.throw(new Error('Event cannot be empty', event));
        }

        const subject = new Rx.AsyncSubject<Event>();
        this.db.events.insert<Event>(event, function (err, newDoc) {
            if (err) {
                throw new Error('Could not add event', err.message);
            }

            subject.next(newDoc);
            subject.complete();
        });
        return subject;
    }

    updateEvent(id: string, event: Event): Rx.Observable<Event> {
        if (!event) {
            return Rx.Observable.throw(new Error('Event cannot be empty', event));
        }
        console.log('event being updated', JSON.stringify(event));

        const subject = new Rx.AsyncSubject<Event>();
        this.db.events.update({_id: id}, event, {}, function (err) {
            if (err) {
                throw new Error('Could not update event for id' + id, err);
            }

            subject.next(event);
            subject.complete();
        });
        return subject;
    }
}