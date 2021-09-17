var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: '4 Text Block',
  addFields: [
    {
      name: 'title',
      label: 'Title',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    },
    {
      name: 'textA',
      label: 'Text Top Left',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    },
    {
      name: 'textB',
      label: 'Text Top Right',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    },
    {
      name: 'textC',
      label: 'Text Bottom Left',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    },
    {
      name: 'textD',
      label: 'Text Bottom Right',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    },
    {
      name: 'bgImage',
      label: 'Backround Image',
      type: 'singleton',
      widgetType: 'apostrophe-images'
    }
  ],
  construct: function(self, options) {
    self.addHelpers(locals);
  }
};