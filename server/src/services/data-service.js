"use strict";
var DataStore = require('nedb');
var Rx = require('@reactivex/rxjs');
var error_1 = require("../common/error");
var DB = (function () {
    function DB(events) {
        this.events = events;
    }
    return DB;
}());
var DataService = (function () {
    function DataService(app) {
        this.app = app;
        var that = this;
        var dbDir = this.getDbDirectory();
        var eventsStore = new DataStore({
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
    DataService.prototype.getDbDirectory = function () {
        var dbEnv = 'prod/';
        if (this.app.get('env') === 'development') {
            dbEnv = 'dev';
        }
        else {
            dbEnv = 'prod';
        }
        return 'db/' + dbEnv + '/';
    };
    DataService.prototype.initEvents = function (eventsStore) {
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
                });
            }
        });
    };
    DataService.prototype.getEvents = function (opt) {
        var subject = new Rx.AsyncSubject();
        var options = opt || {
            includeDrafts: false
        };
        var filters;
        filters = {};
        if (!options.includeDrafts) {
            filters = {
                published: true
            };
        }
        this.db.events.find(filters).sort({ date: -1 }).exec(function (err, docs) {
            if (err) {
                console.log('Could not get list of events', err);
                throw new error_1.Error('Could not get list of events', err);
            }
            subject.next(docs);
            subject.complete();
        });
        return subject;
    };
    DataService.prototype.addEvent = function (event) {
        if (!event) {
            return Rx.Observable.throw(new error_1.Error('Event cannot be empty', event));
        }
        var subject = new Rx.AsyncSubject();
        this.db.events.insert(event, function (err, newDoc) {
            if (err) {
                throw new error_1.Error('Could not add event', err.message);
            }
            subject.next(newDoc);
            subject.complete();
        });
        return subject;
    };
    DataService.prototype.updateEvent = function (id, event) {
        if (!event) {
            return Rx.Observable.throw(new error_1.Error('Event cannot be empty', event));
        }
        console.log('event being updated', JSON.stringify(event));
        var subject = new Rx.AsyncSubject();
        this.db.events.update({ _id: id }, event, {}, function (err) {
            if (err) {
                throw new error_1.Error('Could not update event for id' + id, err);
            }
            subject.next(event);
            subject.complete();
        });
        return subject;
    };
    return DataService;
}());
exports.DataService = DataService;
