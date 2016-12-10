"use strict";
const DataStore = require('nedb');
const Rx = require('@reactivex/rxjs');
const error_1 = require("../common/error");
class DB {
    constructor(events) {
        this.events = events;
    }
}
class DataService {
    constructor(app) {
        this.app = app;
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
    getDbDirectory() {
        let dbEnv = 'prod/';
        if (this.app.get('env') === 'development') {
            dbEnv = 'dev';
        }
        else {
            dbEnv = 'prod';
        }
        return 'db/' + dbEnv + '/';
    }
    initEvents(eventsStore) {
        eventsStore.count({}, function (err, count) {
            if (err) {
                console.error('Error getting event count', JSON.stringify(err));
                return;
            }
            if (count == 0) {
                eventsStore.insert([{
                        title: 'Title 1 up',
                        content: 'Content 1 up',
                        date: new Date()
                    }, {
                        title: 'Title 2 up',
                        content: 'Content 2 up',
                        date: new Date()
                    }], function (err, newDocs) {
                    if (err) {
                        console.error('Error adding docs to database', JSON.stringify(err));
                    }
                    console.log('Added new documents', newDocs);
                });
            }
        });
    }
    getEvents(opt) {
        const subject = new Rx.AsyncSubject();
        let options = opt || {
            includeDrafts: false
        };
        this.db.events.find({}).sort({ date: -1 }).exec(function (err, docs) {
            if (err) {
                console.log('Could not get list of events', err);
                throw new error_1.Error('Could not get list of events', err);
            }
            subject.next(docs);
            subject.complete();
        });
        return subject;
    }
    addEvent(event) {
        if (!event) {
            return Rx.Observable.throw(new error_1.Error('Event cannot be empty', event));
        }
        const subject = new Rx.AsyncSubject();
        this.db.events.insert(event, function (err, newDoc) {
            if (err) {
                throw new error_1.Error('Could not add event', err.message);
            }
            subject.next(newDoc);
            subject.complete();
        });
        return subject;
    }
    updateEvent(id, event) {
        if (!event) {
            return Rx.Observable.throw(new error_1.Error('Event cannot be empty', event));
        }
        const subject = new Rx.AsyncSubject();
        this.db.events.update({ _id: id }, event, {}, function (err) {
            if (err) {
                throw new error_1.Error('Could not update event for id' + id, err);
            }
            subject.next(event);
            subject.complete();
        });
        return subject;
    }
}
exports.DataService = DataService;
