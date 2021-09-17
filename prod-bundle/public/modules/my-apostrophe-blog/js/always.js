$(function(){
	// only if we're on an article page
	if (!$('.bt-article').length) { return }

	var $progressBar = $('.bt-progress-bar'),
			$percent = $progressBar.find('.bt-progress-bar__percent'),
			pageHeight = $(document).height(),
			windowHeight = $(window).height(),
			lastPos = 0;

	// scroll listener
	$(window).on('scroll', function() {
		var pos = window.scrollY;
		if (pos === lastPos) { return }

		var per = (Math.min(Math.ceil(((pos + windowHeight) / pageHeight) * 100), 100)) + '%';
		$percent.css('width', per);
		lastPos = pos;
	})


	// Talkify button
	var $textToSpeachBtn = $('.bt-text-to-speach-button');

	$textToSpeachBtn.click(function(e) {
		initTalkify()
	})

})


function initTalkify() {
	console.log('initTalkify');
	$("head link[rel='stylesheet']").last().after(`<link type="text/css" rel="stylesheet" href="/css/vendor/talkify/talkify-audiocontrols.css">
<link type="text/css" rel="stylesheet" href="/css/vendor/talkify/talkify-common.css">
<link type="text/css" rel="stylesheet" href="/css/vendor/talkify/talkify-playlist.css">`);


	talkify.config.remoteService.host = 'https://talkify.net';
	talkify.config.remoteService.apiKey = '5fccd63e-a781-4e6c-8f7e-a6514c511d21';

	talkify.config.ui.audioControls = {
	  enabled: true, //<-- Disable to get the browser built in audio controls
	  container: document.getElementById("bt-text-to-speach")
	};
	var player = new talkify.TtsPlayer().enableTextHighlighting();

  new talkify.playlist()
      .begin()
      .usingPlayer(player)
      .withRootSelector('.bt-article__body')
      .withTextInteraction()
      .withElements(document.querySelectorAll('.apos-rich-text p, .apos-rich-text h2, .apos-rich-text li, .apos-rich-text h3, .apos-rich-text h4, .bt-article-marquee__body'))
      .build();
}