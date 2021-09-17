var locals = require('../locals/index');

module.exports = {
	extend: 'apostrophe-blog-widgets',
	label: 'Article Grid',
	piecesModuleName: 'apostrophe-blog',

  construct: function(self, options) {
    self.addHelpers(locals);
  }
}