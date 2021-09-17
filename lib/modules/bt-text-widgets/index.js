var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Text',
  contextualOnly: true,
  addFields: [
    {
      name: 'text',
      label: 'Text',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    }
  ],
  construct: function(self, options) {
    self.addHelpers(locals);
  }
};
