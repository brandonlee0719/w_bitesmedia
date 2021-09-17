const CrudController = require('./crud');
const collectionName = 'assignments';

module.exports = {
    list: function(self) {
        return CrudController.list(self, collectionName, {
            fields: {
                id: 1,
                name: 1,
                startDate: 1,
                endDate: 1,
                articleId: 1,
                articleSlug: 1,
                articleImage: 1
                // individual: 1,
            },
            requireUser: true,
            insertCurrentUserId: 'userId'
        })
    },

    find: function(self) {
        return CrudController.find(self, collectionName, {
            fields: {
                id: 1,
                name: 1,
                startDate: 1,
                endDate: 1,
                articleId: 1,
                articleSlug: 1,
                articleImage: 1
                // individual: 1,
            },
            requireUser: true
        })
    },
    create: function(self) {
        return CrudController.create(self, collectionName);
    },
    update: function(self) {
        return CrudController.update(self, collectionName, {
            requireUser: true
        })
    }
};