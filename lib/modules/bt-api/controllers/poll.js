module.exports = {
    create: function (self) {
        return function (req, res) {
            const id = req.params.id;
            const userId = req.data && req.data.user && req.data.user._id;

            return self.apos.db.collection('polls', function (err, collection) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                return collection.insertOne({
                    surveyId: id,
                    userId: userId,
                    response: req.body.response
                }, function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    collection.aggregate([
                        {"$group": {"_id": {"surveyId": id, "response": "$response"}, "count": {"$sum": 1}}},
                    ], function (error, agg) {
                        // console.log("Agg", agg);
                        let total = 0;
                        const totals = {};
                        agg.forEach(function (row) {
                            if (row._id.response) {
                                total += row.count;
                            }
                        });

                        agg.forEach(function (row) {
                            if (row._id.response) {
                                totals[row._id.response] = Math.round((row.count / total) * 100);
                            }
                        });


                        return res.status(200).json({
                            success: true,
                            results: totals
                        })
                    });

                })
            });
        };
    }
};