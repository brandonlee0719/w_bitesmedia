var locals = require('../locals/index')
var converter = require('json-2-csv')
var AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'AKIAJF66ONUK2DAVRRAQ',
    secretAccessKey: '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'
})

// required form fields
var fillabile = [
    'title',
    'slug',
    'timestamp',
    'date',
    'user_title',
    'user_id',
    'user_username',
    'user_email'
].concat(
    [...new Array(36)].map(
        (_, i) =>
            ((i + 1) % 2 ? 'question_' : 'answer_') + Math.floor((i + 2) / 2)
    )
)

module.exports = {
    extend: 'apostrophe-pieces-widgets',
    construct: function (self, options) {
        self.addHelpers(locals)
        self.pushAsset('script', 'user', {when: 'user'})

        self.route('post', 'submit', function (req, res) {
            // authed user?
            if (!req.user || req.user._id !== req.body['user_id']) {
                return res.sendStatus(401)
            }

            // fill form fields, so all forms conform to the same shape
            var form = {}
            fillabile.forEach(k => (form[k] = req.body[k] ? req.body[k] : ' '))

            let completion = 0;
            let answered = 0;
            let total = 0;
            const ll = Object.keys(req.body).length;
            for(let i = 1; i <= ll; i++) {
                if(req.body[`question_${i}`]) {
                    if(req.body[`answer_${i}`] !== undefined && req.body[`answer_${i}`] !== '') {
                        answered++;
                    }
                    total++;
                }
            }

            completion = (answered/total) * 100;


            // convert to csv
            return converter.json2csv(
                [form],
                function (err, arr) {
                    var csv = arr
                    var filename =
                        'csv/' +
                        req.body.timestamp +
                        '_' +
                        req.body['user_title'] +
                        '_' +
                        req.body.slug
                    // insert into db
                    return self.apos.db
                        .collection('formSubmitions')
                        .insertOne(req.body, function (err, response) {
                            if (err) {
                                console.log(err)
                                return res.sendStatus(500)
                            }

                            var s3 = new AWS.S3()
                            return s3.putObject(
                                {
                                    Bucket: 'bites-website-assessment-submitions',
                                    Key: filename + '.csv',
                                    Body: csv,
                                },
                                function (resp) {
                                    console.log('Successfully uploaded Assessment.')

                                    return self.apos.db
                                        .collection('students')
                                        .update({
                                            studentId: req.user._id
                                        }, {
                                            "$set": {
                                                [`progress.${req.body.articleId}.quizCompletion`]: {
                                                    answered,
                                                    total,
                                                    completion
                                                }
                                            }
                                        }, function (err, response) {
                                            if (err) {
                                                console.error("Could not update progress on student", err);
                                            }

                                            return res.sendStatus(200);
                                        });
                                })
                        })
                },
                {delimiter: {wrap: '"'}, defaultValue: ' ', includeEmptyRows: true}
            )
        })
    }
}
