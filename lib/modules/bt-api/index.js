const Article = require('./controllers/article');
const Poll = require('./controllers/poll');
// const Classes = require('./controllers/classes');
const Codes = require('./controllers/codes');
const Students = require('./controllers/students');
const Assignments = require('./controllers/assignments');

module.exports = {
    construct: function(self, options) {
        self.apos.app.get('/api/v1/articles', Article.list(self));
        self.apos.app.get('/api/v1/article-tiles', Article.list(self));

        self.apos.app.post('/api/v1/poll/:id', Poll.create(self));

        // self.apos.app.get('/api/v1/classes', Classes.list(self));
        // self.apos.app.post('/api/v1/classes', Classes.create(self));
        // self.apos.app.put('/api/v1/classes/:id', Classes.update(self));

        self.apos.app.get('/api/v1/codes', Codes.list(self));
        self.apos.app.get('/api/v1/codes/:id', Codes.find(self));
        self.apos.app.post('/api/v1/codes', Codes.create(self));
        // self.apos.app.put('/api/v1/codes/:id', Codes.update(self));

        self.apos.app.get('/api/v1/students', Students.list(self));
        self.apos.app.get('/api/v1/students/assignments', Students.listAssignments(self));
        self.apos.app.post('/api/v1/students/track', Students.track(self));
        self.apos.app.get('/api/v1/students/progress/:id', Students.getProgress(self));

        self.apos.app.get('/api/v1/assignments', Assignments.list(self));
        self.apos.app.get('/api/v1/assignments/:id', Assignments.find(self));
        self.apos.app.post('/api/v1/assignments', Assignments.create(self));
        self.apos.app.put('/api/v1/assignments/:id', Assignments.update(self));


    }
};