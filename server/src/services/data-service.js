"use strict";
var DataStore = require('nedb');
var Rx = require('@reactivex/rxjs');
var error_1 = require("../common/error");
var bcrypt = require('bcrypt-nodejs');
var user_1 = require("../models/user");
var DB = (function () {
    function DB(events, users) {
        this.events = events;
        this.users = users;
    }
    return DB;
}());
var DataService = (function () {
    function DataService(app, envConfig) {
        this.app = app;
        this.envConfig = envConfig;
        var that = this;
        var dbDir = this.getDbDirectory();
        var eventsStore = new DataStore({
            filename: dbDir + 'events.db'
        });
        var usersStore = new DataStore({
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
        usersStore.loadDatabase(function (err) {
            if (err) {
                console.error('Error loading database', JSON.stringify(err));
                return;
            }
            that.initUsers(usersStore);
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
    DataService.prototype.initUsers = function (usersStore) {
        var that = this;
        usersStore.count({}, function (err, count) {
            if (err) {
                console.error('Error getting user count', JSON.stringify(err));
                return;
            }
            if (count == 0) {
                usersStore.insert(new user_1.User(that.envConfig.defaultAdminAccount.username, that.hashPassword(that.envConfig.defaultAdminAccount.username)));
            }
        });
    };
    DataService.prototype.hashPassword = function (password) {
        return bcrypt.hashSync(this.envConfig.defaultAdminAccount.username, this.envConfig.bCryptSalt);
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
    DataService.prototype.isValidCredentials = function (username, password) {
        var subject = new Rx.AsyncSubject();
        console.log('username', username);
        this.db.users.findOne({
            username: username,
            password: this.hashPassword(password)
        }, function (err, user) {
            if (err) {
                console.log('Could not get list of events', err);
                throw new error_1.Error('Could not match user', err);
            }
            if (user == null) {
                throw new error_1.Error('User not found');
            }
            subject.next(user);
            subject.complete();
        });
        return subject;
    };
    return DataService;
}());
exports.DataService = DataService;
