var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Two Tone Columns',
  // contextualOnly: true,
  addFields: [
    {
      type: 'area',
      name: 'left',
      label: 'Left',
      contextual: true,
    },
    {
      type: 'area',
      name: 'right',
      label: 'Right',
      contextual: true,
    },
    {
      name: 'bgImage',
      label: 'Background Image',
      type: 'singleton',
      widgetType: 'apostrophe-images',
    }
  ],
  construct: function(self, options) {
    self.addHelpers(locals);
  }
};
