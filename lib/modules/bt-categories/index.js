module.exports = {
  extend: 'apostrophe-pieces',
  alias: 'categories',
  name: 'category',
  label: 'Category',
  pluralLabel: 'Categories',
  addFields: [
    {
      name: 'thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      label: 'Thumbnail'
    }
  ],
  arrangeFields: [
    { name: 'category', label: 'Category', fields: ['title', 'thumbnail'] },
    { name: 'admin', label: 'Admin', fields: ['tags', 'slug', 'published'] }
  ]
}	