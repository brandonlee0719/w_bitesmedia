const CrudController = require('./crud');
const collectionName = 'classes';

module.exports = {
    list: function(self) {
        return CrudController.list(self, collectionName, {
            fields: {
                _id: 1,
                name: 1
            }
        })
    },

    create: function(self) {
        return CrudController.create(self, collectionName);
    },

    update: function(self) {
        return CrudController.update(self, collectionName)
    }
};