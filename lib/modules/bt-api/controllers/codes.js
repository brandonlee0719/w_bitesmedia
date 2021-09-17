const CrudController = require('./crud');
const collectionName = 'codes';

module.exports = {
    list: function(self) {
        return CrudController.list(self, collectionName, {
            fields: {
                id: 1,
                name: 1,
                relationName: 1,
                relationCode: 1,
                relations: 1,
                fullName: 1,
                username: 1,
                type: 1
            },
            requireUser: true
        })
    },

    find: function(self) {
        return CrudController.find(self, collectionName, {
            fields: {
                id: 1,
                name: 1,
                relationName: 1,
                relationCode: 1,
                relations: 1,
                fullName: 1,
                username: 1,
                type: 1
            },
            requireUser: true
        })
    },

    create: function(self) {
        return CrudController.create(self, collectionName, {
            admin: true
        });
    }
};