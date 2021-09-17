// This configures the apostrophe-users module to add an admin-level
// group by default:
//
// var codes = [
//     'biteswelcome_pvLCy8',
//     'biteswelcome_AoRdKp',
//     'biteswelcome_wufr7F',
//     'biteswelcome_d9VtM4',
//     'biteswelcome_4L4saC',
//     'biteswelcome_aePNnC',
//     'biteswelcome_poPmWX',
//     'biteswelcome_yLm3Hp',
//     'biteswelcome_wEBy78',
//     'biteswelcome_PheoUQ',
//     'biteswelcome_Qp3ygp',
//     'biteswelcome_7Nfhj8',
//     'biteswelcome_4L4saE'    // Tutoring Plus Student
// ];
//
// var studentCodes = [
//     'biteswelcome_pvLCy8',
//     'biteswelcome_AoRdKp',
//     'biteswelcome_wufr7F',
//     'biteswelcome_d9VtM4',
//     'biteswelcome_4L4saC',
//     'biteswelcome_aePNnC',
//     'biteswelcome_poPmWX',
//     'biteswelcome_yLm3Hp',
//     'biteswelcome_wEBy78',
//     'biteswelcome_PheoUQ',
//     'biteswelcome_Qp3ygp',
//     'biteswelcome_7Nfhj8',
//     'biteswelcome_4L4saE'    // Tutoring Plus Student
// ];
//
// var teacherCodes = [
//     'biteswelcome_4L4saD'    // Tutoring Plus Teacher
// ];
//
// var teacherStudentMap = {
//     "biteswelcome_4L4saD": "biteswelcome_4L4saE"   // Tutoring Plus
// };

var uuid = require('node-uuid');

module.exports = {
    groups: [
        {
            title: 'guest',
            permissions: []
        },
        {
            title: 'admin',
            permissions: ['admin']
        },
        {
            title: 'teacher',
            permissions: ['teacher']
        },
        {
            title: 'student',
            permissions: ['student']
        }
    ],
    addFields: [
        {
            name: 'first_name',
            label: 'First Name',
            type: 'string',
            required: true
        },
        {
            name: 'last_name',
            label: 'Last Name',
            type: 'string',
            required: true
        },
        {
            name: 'email',
            label: 'Email',
            type: 'string',
            required: true
        },
        {
            name: 'token',
            label: 'Sign Up Code',
            type: 'string',
            required: true
        }
    ],

    construct: function (self, options) {
        self.beforeInsert = function (req, piece, options, callback) {
            self.apos.db.collection('aposDocs', function(error, aposDocs) {
                if (error) {
                    return callback(error);
                }
                let code;

                self.apos.db.collection('codes', function (error, collection) {
                    if (error) {
                        return callback(error);
                    }

                    return collection.findOne({
                        name: piece.token
                    }, {
                        id: 1,
                        name: 1,
                        type: 1,
                        relationName: 1,
                        fullName: 1,
                        relationCode: 1,
                        relations: 1,
                        userId: 1,
                    }).then(function (_code) {
                        code = _code;

                        // console.log("CODE: ", code);
                        if (!code) {
                            throw new Error('Unauthorized. Bad Code: ' + JSON.stringify(piece))
                        }

                        piece.title = piece.username;
                        piece.name = (piece.first_name || '') + ' ' + (piece.last_name || '');

                        if(!piece.name) {
                            piece.name = piece.title;
                        }

                        return aposDocs.findOne({
                            type: 'apostrophe-group',
                            title: code.type
                        });
                    }).then(function(group) {
                        piece.groupIds = [group._id];

                        req.code = code;
                        req.codeCollection = collection;

                        if(code.relationId) {
                            piece.relationId = code.relationId;
                        }
                        piece.relationType = code.type;

                        return callback();
                    })
                        .catch(function (error) {
                            return callback(error);
                        });
                })
            });
        };

        self.afterInsert = function(req, piece, options, callback) {
            const collection = req.codeCollection;
            const code = req.code;
            let result;

            // fetch the relationship code or refetch current code
            return collection.findOne({
                name: code.relationCode || code.name
            }, {
                id: 1,
                name: 1,
                type: 1,
                relationName: 1,
                fullName: 1,
                relationCode: 1,
                userId: 1,
                relations: 1
            })
            .then(function(_result) {
                // console.log("Result: ", result);
                result = _result;

                const update = {
                    used: true
                };

                if(code.id !== result.id) {
                    update.relationId = result.id;
                    update.relationCode = result.name;
                }

                if (code.type === 'teacher') {
                    update.relationName = piece.name;
                    update.fullName = piece.name;
                    update.userId = piece._id;
                    update.username = piece.username;
                } else if (code.type === 'student') {
                    // relationName should exist if the teacher already exists
                    // if not, we don't know who the teacher is yet.
                    update.relations = code.relations || {};
                    update.relations[piece._id] = {
                        name: piece.name,
                        userId: piece._id,
                        username: piece.username,
                        created: new Date(),
                        type: 'student'
                    };

                    console.log("Update: ", update);

                }

                // console.log("Issuing update: ", update);

                return collection.update({
                    _id: code._id
                }, {
                    "$set": update,
                })
            })
            .then(function() {
                if(code.type === 'student') {
                    return new Promise(function(resolve, reject) {
                        self.apos.db.collection('students', function (error, collection) {
                           if(error) {
                               return reject(error);
                           }

                           resolve(collection);
                        });
                    })
                    .then(function(collection) {
                        const id = uuid.v4();
                        return collection.insertOne({
                                id: id,
                                _id: id,
                                studentId: piece._id,
                                teacherId: result.userId,
                                studentName: piece.name,
                                studentFirstName: piece.first_name,
                                studentLastName: piece.last_name,
                                teacherName: result.relationName
                            });
                    });
                }

            })
            .then(function() {
                return callback();
            })
            .catch(function (error) {
                console.error('Could not sign up with code - ', error.message);
                return callback(error);
            });
        }
    }
};
