var locals = require('../locals/index');

module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Youtube Player',
  addFields: [
    {
      name: 'videoId',
      label: 'Youtube Video ID',
      type: 'string'
    }
    // {
    //   name: 'height',
    //   label: 'Height',
    //   type: 'select',
    //   choices: [
    //       // { value: 'auto', label: 'Auto' },
    //       { value: 'tall', label: 'Tall' },
    //       { value: 'medium', label: 'Medium' },
    //       { value: 'short', label: 'Short' }
    //   ],
    //   def: 'medium'
    // }
  ],
  construct: function(self, options) {
    self.addHelpers(locals);

    self.pushAsset('script', 'always', { when: 'always' });
  }
};
