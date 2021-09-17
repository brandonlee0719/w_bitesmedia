apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function(self, options) {
    self.beforeCkeditorInline = function() {
  		
  		// enable native spell check
  		self.config.disableNativeSpellChecker = false
  		// remove ckeditor right click menu
  		self.config.removePlugins = 'liststyle,tabletools,scayt,menubutton,contextmenu'
    };
  }
});