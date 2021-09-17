// apos.define('otf-youtube-widgets', {
//   extend: 'apostrophe-widgets',
//   construct: function(self, options) {
//     self.play = function($widget, data, options) {

//       var player;
//       var $outer = $widget.find('.otf-youtube-player');
//       var $elm = $widget.find('.otf-video-elm');
//       var videoId = $elm.attr('data-video-id');

//       // place widget id
//       $elm.attr('id', 'player_' + data._id);

//       function onPlayerReady(event) {
//         // Play button
//         $widget.find(".otf-video-play").click(function() {
//           $outer.addClass('active');
//           player.playVideo();
//         });
//       }

//       // this function gets called when the youtube API is ready to use
//       // - we need to init all players because this function only gets
//       //   called once, so we use the super pattern in case of other
//       //   widget players
//       var superOnYouTubePlayerAPIReady = window.onYouTubePlayerAPIReady;
//       window.onYouTubePlayerAPIReady = function() {
//         if (typeof(superOnYouTubePlayerAPIReady) === 'function') {
//           superOnYouTubePlayerAPIReady();
//         }
//         player = new YT.Player('player_' + data._id, {
//           videoId: videoId,
//           events: {
//             'onReady': onPlayerReady
//           }
//         });
//       };

//       if (!window.loadedYT) {
//         // Load YouTube API
//         var tag = document.createElement('script');
//         tag.src = "https://www.youtube.com/iframe_api";
//         var firstScriptTag = document.getElementsByTagName('script')[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//         window.loadedYT = true;
//       }

//     };
//   }
// });
