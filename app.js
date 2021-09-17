if (process.env.LOCAL) {
    require('dotenv').config();
}

// console.log("PROCESS ENV", process.env);

var path = require('path');
var locals = require('./lib/modules/locals/index')

var apos = require('apostrophe')({
    shortName: 'bites',

    // See lib/modules for basic project-level configuration of our modules
    // responsible for serving static assets, managing page templates and
    // configuring user acounts.

    bundles: ['apostrophe-blog'],

    modules: {
        "apostrophe-express": {},

        // Apostrophe module configuration

        // Note: most configuration occurs in the respective
        // modules' directories. See lib/apostrophe-assets/index.js for an example.

        // However any modules that are not present by default in Apostrophe must at
        // least have a minimal configuration here: `moduleName: {}`

        // If a template is not found somewhere else, serve it from the top-level
        // `views/` folder of the project

        'apostrophe-templates': {viewsFolderFallback: path.join(__dirname, 'views')},
        'apostrophe-users': {},
        // ** The name you give this module is significant. **
        // It should begin with the name of the pieces module you want
        // to add the submissions feature to, and end with -submit-widgets
        'apostrophe-users-submit-widgets': {
            // Your module extends this one, and adds capabilities
            // to your pieces module
            extend: 'apostrophe-pieces-submit-widgets',
            // Always spell out the schema field names the user is allowed to edit.
            // You almost certainly don't want them to have control
            // of the "published" field, for instance
            fields: ['title', 'first_name', 'last_name', 'email', 'username', 'password', 'token']
        },
        // add rest api for terms
        'apostrophe-headless': {},

        // Forms
        'bt-forms': {},
        'bt-forms-widgets': {},
        // Categories
        'bt-categories': {},
        'bt-poll': {},

        // Articles
        'apostrophe-blog': {
            restApi: true,
            maxPerPage: 30,
            safeFilters: ['category']
        },
        'apostrophe-blog-pages': {
            construct: function (self, options) {
                self.addHelpers(locals);
            }
        },
        'apostrophe-blog-widgets': {},

        'apostrophe-teachers-portal': {},

        // Glossary
        'bt-glossary': {},

        // Grid
        'bt-two-column-widgets': {},


        // Widgets
        'bt-home-marquee-widgets': {},
        'bt-categories-widgets': {},
        'bt-categories-details-widgets': {},
        'bt-topics-widgets': {},
        'bt-topics-detail-widgets': {},
        'bt-landing-widgets': {},
        'bt-popular-bites-widgets': {},
        'bt-article-grid-widgets': {},
        'bt-text-widgets': {},
        'bt-text-color-bg-widgets': {},
        'bt-text-image-bg-widgets': {},
        'bt-image-block-widgets': {},
        'bt-image-block-full-widgets': {},
        'bt-two-tone-columns-widgets': {},
        'bt-text-quadrants-widgets': {},
        'bt-youtube-widgets': {},
        'bt-poll-widgets': {},
        'bt-api': {}
    }
});

module.exports = apos;
