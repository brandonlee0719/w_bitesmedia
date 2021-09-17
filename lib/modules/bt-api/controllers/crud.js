const Errors = require('../errors');
var uuid = require('node-uuid');

module.exports = {
    list: function (self, collectionName, options) {
        options = options || {};

        return function (req) {
            // console.log("REQ: ", req);


            if(options.requireUser && !req.data.user) {
                return req.res.status(401).json({
                    success: false,
                    error: 'You need to be logged in.'
                })
            }

            self.apos.db.collection(collectionName, function (err, collection) {

                if (err) {
                    console.error("Error getting collection: ", err);
                    return Errors.handleError(req.res, {
                        message: 'There was an issue, please try again.'
                    });
                }


                let query = {};

                if(req.query.q) {
                    try {
                        query = JSON.parse(req.query.q);
                    } catch (e) {

                    }
                }

                const defaults = options.defaults || {};

                let sort = {};
                if (req.query.sort) {
                    sort[req.query.sort] = req.query.order || -1;
                }

                // inserts the current users' id
                const userId = req.data && req.data.user && req.data.user._id;
                if(options.insertCurrentUserId && userId) {
                    query[options.insertCurrentUserId] = userId;
                }

                return collection.find(Object.assign({}, defaults, query), options.fields).sort(sort).skip(parseInt(req.query.offset) || 0).limit(parseInt(req.query.limit) || 21).toArray(function (err, data) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    req.res.status(200).json({
                        success: true,
                        results: data
                    });
                });
            });
        }
    },

    find: function (self, collectionName, options) {
        options = options || {};

        return function (req) {
            // console.log("REQ: ", req);

            if(options.requireUser && !req.data.user) {
                return res.status(401).json({
                    success: false,
                    error: 'You need to be logged in to create this.'
                })
            }

            self.apos.db.collection(collectionName, function (err, collection) {
                if (err) {
                    // console.error("Could not connect to database");
                    return Errors.handleError(req.res, {
                        message: 'There was an issue, please try again.'
                    });
                }


                let query = {
                    id: req.params.id
                };

                return collection.findOne(query, options.fields).toArray(function (err, data) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    req.res.status(200).json({
                        success: true,
                        results: [data]
                    });
                });
            });
        }
    },

    create: function (self, collectionName, options = {}) {
        return function (req, res) {
            const data = req.body;
            const userId = req.data && req.data.user && req.data.user._id;

            // console.log("REQ: ", req.data.user);

            if(!req.data.user) {
                return res.status(401).json({
                    success: false,
                    error: 'You need to be logged in to create this.'
                })
            }

            if(options.admin && (!req.data.user || !req.data.user._permissions.admin)) {
                return res.status(401).json({
                    success: false,
                    error: 'You need to be an admin to create this.'
                })
            }

            data.userId = userId;

            if(!data.id) {
                data.id = uuid.v4();
            }

            if(!data._id) {
                data._id = data.id;
            }

            data.createdAt = new Date();
            data.updatedAt = new Date();

            return self.apos.db.collection(collectionName, function (err, collection) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                console.log("POST", data);

                return collection.insertOne(data, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        results: [{
                            id: data.id
                        }]
                    })
                })
            });
        };
    },

    update: function (self, collectionName, options = {}) {
        return function (req, res) {
            const id = req.params.id;
            const data = req.data;
            if(!req.data.user) {
                return res.status(401).json({
                    success: false,
                    error: 'You need to be logged in to create this.'
                })
            }

            return self.apos.db.collection(collectionName, function (err, collection) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                data.updatedAt = new Date();

                return collection.update({
                    id: id
                }, data, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        results: [result]
                    })
                })
            });
        };
    }
}