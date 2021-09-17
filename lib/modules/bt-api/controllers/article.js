module.exports = {
    list: function(self) {
        return function(req, res) {
            // console.log("Fetching api");

            return self.apos.db.collection('aposDocs', function(err, collection) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                let query;

                try {
                    query = JSON.parse(req.query.q);
                } catch(e) {

                }

                const defaults = {
                    type: 'apostrophe-blog',
                    published: true,
                    trash: false
                };

                let sort = {};
                if(req.query.sort) {
                    sort[req.query.sort] = req.query.order || -1;
                }

                return collection.find(Object.assign({}, defaults, query), {
                    slug: 1,
                    title: 1,
                    marqueeImage: 1,
                    thumbnail: 1,
                    categoryIds: 1,
                    _id: 1,
                    createdAt: 1
                }).sort(sort).skip(parseInt(req.query.offset) || 0).limit(parseInt(req.query.limit) || 21).toArray(function(err, data) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    const imageMap = {};
                    const thumbnailMap = {};

                    data.forEach(function(item, index) {
                        if (item.marqueeImage && item.marqueeImage.items && item.marqueeImage.items[0] && item.marqueeImage.items[0].pieceIds) {
                            imageMap[item.marqueeImage.items[0].pieceIds[0]] = index;
                        }

                        if(item.thumbnail && item.thumbnail.items && item.thumbnail.items[0]) {
                            thumbnailMap[item.thumbnail.items[0].pieceIds[0]] = index;
                        }
                        data[index].marqueeImage = undefined;
                        data[index].id = data[index]._id;
                    });

                    // console.log("ImageIDS:", Object.keys(imageMap));

                    return collection.find({
                        "type": "apostrophe-image",
                        "_id": {
                            "$in": Object.keys(imageMap)
                        }
                    }, {
                        attachment: 1
                    }).toArray(function(err, images) {
                        // console.log("Images: ", images);
                        images.forEach(function(image) {

                            // console.log("Image coming back: ", images);

                            // console.log("Image Map: ", imageMap);
                            if(imageMap[image._id] !== undefined) {
                                data[imageMap[image._id]].image_title = image.attachment.title;
                                data[imageMap[image._id]].image_url = self.apos.attachments.url(image.attachment, {size: 'one-third'});
                            }
                        });

                        return collection.find({
                            "type": "apostrophe-image",
                            "_id": {
                                "$in": Object.keys(thumbnailMap)
                            }
                        }, {
                            attachment: 1
                        }).toArray(function(err, images) {
                            images.forEach(function(image) {
                                if(thumbnailMap[image._id] !== undefined) {
                                    data[thumbnailMap[image._id]].thumbnail = self.apos.attachments.url(image.attachment, {size: 'one-third'});
                                }
                            });

                            req.res.status(200).json({
                                results: data
                            });
                        });
                    });
                });
            });
        }
    }
};