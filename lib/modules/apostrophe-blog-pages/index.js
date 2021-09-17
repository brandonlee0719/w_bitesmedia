var locals = require('../locals/index');
module.exports = {
  construct: function(self, options) {
    self.addHelpers(locals);
    
    self.pushAsset('script', 'always', {when: 'always'});
  }
};
