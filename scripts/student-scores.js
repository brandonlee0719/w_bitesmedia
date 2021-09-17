const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Collection = mongodb.Collection;

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const headers = [
    {id: 'name', title: 'NAME'},
    {id: 'slug', title: 'Article Slug'},
    {id: 'completion', title: 'Completion'}
];

const addHeaders = {};


const Promise = require('bluebird');
var uri = "mongodb://www:vRc8H06gHbssbwZ35@bites-prod-shard-00-00-q48t5.mongodb.net:27017,bites-prod-shard-00-01-q48t5.mongodb.net:27017,bites-prod-shard-00-02-q48t5.mongodb.net:27017/test?ssl=true&replicaSet=bites-prod-shard-0&authSource=admin&retryWrites=true";

const TEACHER_ID = "cjn519rhg01f44uqjftaarczq";

Promise.promisifyAll(Collection.prototype);
Promise.promisifyAll(MongoClient);

Collection.prototype._find = Collection.prototype.find;
Collection.prototype.find = function() {
    var cursor = this._find.apply(this, arguments);
    cursor.toArrayAsync = Promise.promisify(cursor.toArray, cursor);
    cursor.countAsync = Promise.promisify(cursor.count, cursor);
    return cursor;
};


MongoClient.connectAsync(uri)
    .then(function(client) {
    const studentsCollection = client.collection("students");
    const assessmentsCollection = client.collection("formSubmitions");

    return studentsCollection.find({
        "teacherId": TEACHER_ID
    }).toArrayAsync().then(function(students) {
        // console.log("Students: ", students);
        const promises = [];
        const lines = [];

        students.forEach((student) => {
            promises.push(assessmentsCollection.find({
                "user_id": student.studentId
            }).sort({ timestamp: -1 }).toArrayAsync().then(function(studentAssessments) {
                let studentData = {};

                studentAssessments.forEach(function (studentAssessment) {

                    // console.log("Student: ", studentAssessment);
                    let data = {};
                    data.name = student.studentName;
                    // data.push(student.studentName);

                    // console.log("Student Assessment", studentAssessment);
                    // data.push(studentAssessment.slug);

                    const articleId = studentAssessment.articleId;
                    if (student && student.progress && student.progress[articleId]) {
                        const progress = student.progress[articleId];
                        data.slug = progress.articleSlug;

                        if (progress.quizCompletion) {
                            data.completion = progress.quizCompletion.completion;
                        }
                    }

                    for (var key in studentAssessment) {
                        if (key.startsWith("answer_")) {
                            data[key] = studentAssessment[key].replace('\n', ' ');

                            if(!addHeaders[key]) {
                                addHeaders[key] = true;
                            }
                        }
                    }

                    // console.log("Data: ", data);
                    if(!studentData[studentAssessment.articleId]) {
                        studentData[studentAssessment.articleId] = data;
                    }
                });

                return studentData;
            }));
        })


        return Promise.all(promises)
            .then(function(data) {
                const lines = [];
                // console.log("Data: ", data);
                data.forEach(function(line) {
                    for(var k in line) {
                        if(Object.keys(line[k]).length) {
                            lines.push(line[k]);
                        }
                    }
                });
                //
                // console.log("Lines: ", lines.join('\n'));
                for(var header in addHeaders) {
                    headers.push({id: header, title: header.replace('_', ' ').toUpperCase()});
                }

                const csvWriter = createCsvWriter({
                    path: __dirname + '/../tmp/student-scores.csv',
                    header: headers
                });

                return csvWriter.writeRecords(lines)       // returns a promise
                    .then(() => {
                        console.log('...Done');
                    });
            })
            .then(function() {
                process.exit();
            });


        // return students.forEach(function(studentAssessment, j) {

            // studentData.push(data.join(','));

            // console.log("STudentData: ", studentData);
        // });
    })
}).catch(error => {
    console.error(error);
    process.exit(-1);
});