var Datastore = require('nedb');
var Q = require('q');

module.exports = function DataService(app) {
    var db = {};

    var dbDir = getDbDirectory();
    db.events = new Datastore({
        filename: dbDir + 'events.db'
    });

    db.events.loadDatabase(function (err) {
        if (err) {
            console.error('Error loading database', JSON.stringify(err));
            return;
        }

        initEvents();
    });


    function getDbDirectory() {
        var dbEnv = 'prod/';
        if (app.get('env') === 'development') {
            dbEnv = 'dev';
        } else {
            dbEnv = 'prod';
        }
        return 'db/' + dbEnv + '/';
    }

    function initEvents() {
        db.events.count({}, function (err, count) {
            if (err) {
                console.error('Error getting event count', JSON.stringify(err));
                return;
            }

            if (count == 0) {
                db.events.insert([{
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
                })
            }
        });
    }

    return {
        getEvents: function(opt) {
            var deferred = Q.defer();
            var options = opt || {};


            db.events.find({}).sort({date: -1}).exec(function(err, docs) {
                if (err) {
                    console.error('Could not get list of events', err);
                    deferred.reject(new Error('Could not get list of events', err));
                    return;
                }
                deferred.resolve(docs);
            });

            return deferred.promise;
        },
        addEvent: function(event) {
            var deferred = Q.defer();
            if (!event) {
                deferred.reject(new Error('Event cannot be empty', event));
                return deferred.promise;
            }

            db.events.insert(event, function (err, newDoc) {
               if (err) {
                   deferred.reject(new Error('Could not add event', err.message));
                   return;
               }

               deferred.resolve(newDoc);
            });
            return deferred.promise;
        }
    }
};