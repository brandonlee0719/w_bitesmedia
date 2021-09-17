var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Two Columns',
  contextual: true,
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
      type: 'select',
      name: 'bgColor',
      label: 'Background Color',
      choices: [
        {
          label: 'White',
          value: 'white'
        },
        {
          label: 'Blue',
          value: 'blue'
        },
        {
          label: 'Light Blue',
          value: 'blue-light'
        },
        {
          label: 'Gray',
          value: 'gray'
        }
      ]
    }
  ],
  construct: function(self, options) {
    self.addHelpers(locals);
  }
};