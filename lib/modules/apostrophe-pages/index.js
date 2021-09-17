var locals = require('../locals/index');

// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu
module.exports = {
    park: [
        {
            slug: '/signup',
            published: true,
            _defaults: {
                title: 'Sign Up',
                type: 'signUp'
            },
        },
        {
            slug: '/',
            published: true,
            _defaults: {
                title: 'Bites Media',
                type: 'home'
            },
        },
        {
            slug: '/categories',
            published: true,
            _defaults: {
                title: 'Topics',
                type: 'categories'
            },
        },
        {
            slug: '/teachers-portal',
            published: true,
            type: 'react',
            _defaults: {
                title: 'Teacher\'s Portal'
            },
        },
        {
            slug: '/codes',
            published: true,
            type: 'react',
            _defaults: {
                title: 'Codes'
            },
        },
        {
            slug: '/content',
            published: true,
            name: 'content',
            label: 'Content',
            _defaults: {
                title: 'Bites Media',
                type: 'content'
            },
        }
    ],
    types: [
        {
            name: 'default',
            label: 'Default'
        },
        {
            name: 'signUp',
            label: 'Sign Up'
        },
        {
            name: 'categories',
            label: 'Categories'
        },
        {
            name: 'topics',
            label: 'Topics'
        },
        {
            name: 'apostrophe-blog-page',
            label: 'Articles',
            perPage: 30
        },
        
        // Add more page types here, but make sure you create a corresponding
        // template in lib/modules/apostrophe-pages/views/pages!
    ],
    construct: function (self, options) {
        self.addHelpers(locals);


        self.loginAfterLogin = function(req) {
            const groupTitles = req.user._groups.map((group) => group.title);
            if (groupTitles.indexOf('teacher') >= 0) {
                // console.log("setting redirect: ", groupTitles);
                req.redirect = '/teachers-portal';
            } else {
                // Just let them go go the home page
            }
        };
    }
};
