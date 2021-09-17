module.exports = {
  extend: 'apostrophe-pieces',
  alias: 'term',
  name: 'term',
  label: 'Term',
  puralLabel: 'Glossary',
  restApi: {
    maxPerPage: 200
  },
  addFields: [
    {
      name: 'title',
      label: 'Term',
      type: 'string'
    },
    {
      name: 'layoutType',
      label: 'Type',
      type: 'select',
      def: 'text',
      choices: [
        {
          label: 'Text Definition',
          value: 'text',
          showFields: ['example']
        },
        {
          label: 'Text Definition with Image',
          value: 'textImage',
          showFields: ['example', 'image']
        },
        {
          label: 'Image with Caption',
          value: 'imageCaption',
          showFields: ['image']
        }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      textarea: true
    },
    {
      name: 'example',
      label: 'Example Usage',
      type: 'string',
      textarea: true
    },
    {
      name: 'image',
      label: 'Image',
      type: 'singleton',
      widgetType: 'apostrophe-images'
    },
    {
      name: 'published',
      label: 'published',
      def: true,
      type: 'boolean'
    }
  ],
  arrangeFields: [
    { name: 'term', label: 'Term', fields: ['title', 'layoutType', 'image', 'description', 'example'] },
    { name: 'admin', label: 'Admin', fields: ['tags', 'slug', 'published'] }
  ],

  construct: function(self, options) {
    self.pushAsset('script', 'always', {when: 'always'});
  }
};