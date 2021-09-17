var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Text & Colored Background',
  // contextualOnly: true,
  addFields: [
    {
      name: 'text',
      label: 'Text',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      contextual: true
    },
    {
		  type: 'select',
		  name: 'bgColor',
		  label: 'Background Color',
		  choices: [
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
		    },
		    {
		    	label: 'White',
		    	value: 'white'
		    }
		  ]
		}

  ],
  construct: function(self, options) {
    self.addHelpers(locals);
  }
};
