var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Text & Image Background',
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
      name: 'bgImage',
      label: 'Background Image',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      // contextual: true
    },
    {
		  type: 'select',
		  name: 'bgColor',
		  label: 'Screen Color',
		  choices: [
		  	{
		      label: 'Dark',
		      value: 'dark'
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
