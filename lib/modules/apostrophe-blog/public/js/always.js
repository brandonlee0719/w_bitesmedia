$(function () {
    // only if we're on an article page
    if (!$('.bt-article').length) {
        return
    }
    var articleTitle = $('.bt-article-marquee__body h1').text(),
        articleId = $('[data-article-id]').attr('data-article-id'),
        articleSlug = $('[data-article-slug]').attr('data-article-slug'),
        $blocks = $(
            '.bt-article__body > .apos-area > .apos-area-widget-wrapper > [data-apos-widget]'
        ),
        $blocksInView = null,
        // Config
        checkInterval = 1; // seconds


    var user;
    try {
        user = JSON.parse($('[data-apos-user]').attr('data-apos-user'))
    } catch (e) {
    }


    var $progressBar = $('.bt-progress-bar'),
        $percent = $progressBar.find('.bt-progress-bar__percent'),
        pageHeight = $(document).height(),
        windowHeight = $(window).height(),
        headerHeight = $('.bt-header').height(),
        footerHeight = $('.bt-footer').height() + $('.apostrophe-form').height(),
        lastPer = 0;

    if ($.cookie('progress-percent-' + articleId)) {
        // lastPer = $.cookie('progress-percent-' + articleId);
        // $percent.css('width', lastPer + '%');
    }

    // scroll listener + progress bar
        $(window).on('scroll', function () {
            var pos = $(window).scrollTop();
            var per = Math.min(Math.floor((pos) / (pageHeight - windowHeight - headerHeight - footerHeight) * 100), 100);

            if (per === lastPer || per < lastPer) {
                return;
            }

            $percent.css('width', per + '%');
            $.cookie('progress-percent-' + articleId, per);

            if (per > lastPer && user) {
                $.post('/api/v1/students/track', {
                    type: 'progress',
                    articleId: articleId,
                    articleSlug: articleSlug,
                    readPercent: per
                }, function() {
                }, 'json');
            }
            lastPer = per;

        });

    // Talkify button
    var $textToSpeachBtn = $('.bt-text-to-speach-button');

    $textToSpeachBtn.click(function (e) {
        initTalkify()
        $('.bt-text-to-speach-button').addClass("display-none")
    })

    // Analytics tracking ========================

    // BLOCK
    // block selector: data-apos-widget="bt-text"
    //
    // id: data-apos-widget-id="w54928278786567441"
    // title: .data-bt-block-title

    // Only trigger analytics if we have a
    // non-admin user
    if (!user || user._permissions.admin) {
        return
    }

    // endpoint /modules/apostrophe-blog/data/view
    checkBlocksInView()

    // Main checking loop
    setInterval(function () {
        checkBlocksInView()
        postBlocksInView()
    }, checkInterval * 1000)

    function checkBlocksInView() {
        $blocksInView = $.grep($blocks, function (el, i) {
            return inView($(el))
        })
    }

    function postBlocksInView() {
        var blocks = $blocksInView.map(elm => {
            var px = pxInView($(elm))
            var info = blockInfo(elm)
            // can't use spread :(
            info.px = px.px
            info.percent = px.percent
            info.seconds = checkInterval
            return info
        })

        var body = {
            article_id: articleId,
            article_slug: articleSlug,
            article_title: $.trim(articleTitle),
            href: window.location.href,
            blocks: blocks,
            user: user
        }

        $.ajax('/modules/apostrophe-blog/data/view', {
            method: 'POST',
            dataType: 'json',
            data: body,
            error: function (err) {
                console.log('err', err)
            },
            success: function (res) {
                // console.log('res', res)
            }
        })
    }

    function blockInfo(el) {
        return {
            id: $(el).attr('data-apos-widget-id'),
            type: $(el).attr('data-apos-widget'),
            title: $.trim(
                $(el)
                    .first('.data-bt-block-title')
                    .text()
                    .trim()
                    .substring(0, 30)
            )
        }
    }

    function inView($el) {
        var top = $el.offset().top,
            btm = top + $el.outerHeight(),
            height = $el.outerHeight(),
            docViewTop = $(window).scrollTop(),
            docViewBottom = $(window).scrollTop() + $(window).height(),
            windowHeight = $(window).height()

        var inside = docViewBottom + height > btm && btm > docViewTop + headerHeight
        return inside
    }

    function pxInView($el) {
        var top = $el.offset().top,
            btm = top + $el.outerHeight(),
            height = $el.outerHeight(),
            docViewTop = $(window).scrollTop(),
            docViewBottom = $(window).scrollTop() + $(window).height(),
            windowHeight = $(window).height()

        var pxInView =
            docViewBottom -
            top -
            Math.max(0, docViewBottom - btm) -
            Math.max(0, docViewTop + headerHeight - top)
        var percent = pxInView / (windowHeight - headerHeight) * 100
        return {percent: percent, px: pxInView}
    }
})

function initTalkify() {
    $("head link[rel='stylesheet']").last()
        .after(`<link type="text/css" rel="stylesheet" href="/css/vendor/talkify/talkify-audiocontrols.css">
<link type="text/css" rel="stylesheet" href="/css/vendor/talkify/talkify-common.css">
<link type="text/css" rel="stylesheet" href="/css/vendor/talkify/talkify-playlist.css">`)

    talkify.config.remoteService.host = 'https://talkify.net'
    talkify.config.remoteService.apiKey = 'bbfaa51f-b99e-46b1-b628-b44dfb6e7d50'

    talkify.config.ui.audioControls = {
        enabled: true, //<-- Disable to get the browser built in audio controls
        container: document.getElementById('bt-text-to-speach')
    }
    var player = new talkify.TtsPlayer().enableTextHighlighting()

    new talkify.playlist()
        .begin()
        .usingPlayer(player)
        .withRootSelector('.bt-article__body')
        .withTextInteraction()
        .withElements(
            document.querySelectorAll(
                '.apos-rich-text p, .apos-rich-text h2, .apos-rich-text li, .apos-rich-text h3, .apos-rich-text h4, .bt-article-marquee__body'
            )
        )
        .build()
}
