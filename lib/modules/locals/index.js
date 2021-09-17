// Default area styles  ======================================================

var defaultTextStyles = {
  plugins: [
    {
      name: 'basicstyles',
      path: 'lib/modules/apostrophe-areas/public/js/basicstyles'
    }
  ],
  toolbar: [
    'Styles',
    'Bold',
    'Italic',
    'Superscript',
    'Subscript',
    'Link',
    'Unlink',
    'Anchor',
    'Basicstyles',
    'BulletedList',
    'JustifyLeft',
    'JustifyCenter',
    'JustifyRight',
    'Undo',
    'Redo'
  ],
  styles: [
    {
      name: 'Title',
      element: 'h2',
      attributes: { class: 'color--dark data-bt-block-title' }
    },
    {
      name: 'Title (blue)',
      element: 'h2',
      attributes: { class: 'bt-color--blue data-bt-block-title' }
    },
    {
      name: 'Medium Heavy',
      element: 'h3',
      attributes: { class: 'color--dark bt-block-title data-bt-block-title' }
    },
    {
      name: 'Medium',
      element: 'h4',
      attributes: { class: 'color--dark data-bt-block-title' }
    },
    { name: 'Body', element: 'p', attributes: { class: 'color--dark' } }
  ],
  initialContent: 'Write something here'
}
// EXPORTS

module.exports = {
  defaultTextStyles: defaultTextStyles,

  defaultAreaOptions: {
    widgets: {
      'bt-text': defaultTextStyles,
      'bt-image-block': {},
      'bt-text-color-bg': {},
      'bt-text-image-bg': {},
      'bt-two-tone-columns': {},
      'bt-two-column': {},
      'bt-forms': {},
      'bt-text-quadrants': {},
      'bt-youtube': {},
      'apostrophe-html': {}
    }
  },

  sanitzeHtmlOptions: {
    allowedClasses: {
      '*': [
        'bt-color--blue',
        'bt--bold',
        'bt--heavy',
        'bt-color--dark',
        'bt--heavy',
        'data-bt-block-title'
      ]
    },
    allowedAttributes: {
      '*': ['style', 'href', 'target']
    },
    allowedTags: [
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'sup',
      'sub'
    ]
  },

  // helpers

  fullNameToInitials: function(s) {
    let f = s.substring(0, 1)
    let l =
      s.indexOf(' ') > -1
        ? s.substring(s.indexOf(' ') + 1, s.indexOf(' ') + 2)
        : ''
    return (f + l).toUpperCase()
  },

  filterUserSchema: function(schema) {
    let out = ['title']
    return schema.filter(s => !out.includes(s.name))
  }
}
