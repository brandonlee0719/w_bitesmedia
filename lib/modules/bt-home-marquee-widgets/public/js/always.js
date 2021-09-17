apos.define('bt-home-marquee-widgets', {
  extend: 'apostrophe-pieces-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      $widget.projector({
      	delay: 0,
      });
    };
  }
});