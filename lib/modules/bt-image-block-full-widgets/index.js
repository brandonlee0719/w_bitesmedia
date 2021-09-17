var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Image(s) - Full Width',
  contextualOnly: true,
  addFields: [
    {
      name: 'image',
      label: 'Text',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      contextual: true
    }
  ],
  construct: function(self, options) {
    self.addHelpers(locals);
  }
};