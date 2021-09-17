$(function() {
    var selectedId = $('.topics .item').first().addClass('active').attr('data-id');
    var title = $('.topics .item.active span').text();

    const makeRequest = function(selectedId) {
        const query = {};

        if(selectedId) {
            query.categoryIds = [selectedId];
        }

        $.ajax('/api/v1/article-tiles?q=' + encodeURIComponent(JSON.stringify(query)), {
            dataType: 'json',
            error: function(err) {
                console.log('err', err)
            },
            success: function(res) {
                if (!res.results || !res.results.length) {
                    return;
                }
                var sortedResults = sortTimeResults(res.results);
                showFilteredResults(sortedResults);
            }
        })
    };

    const sortTimeResults = function(results) {

        return results.sort((a, b) => 
            new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime() ? 1 : -1
        );
    }

    const showFilteredResults = function(results) {
        results.forEach(function (result, idx) {
            var $tile = createTile(result, idx);
            $(".topic_slider").slick('slickAdd', $tile);
        });
    };

    const createTile = function(article, i) {
        var $tile = $('<div />').addClass('slide-item').attr('data-index', i);
        var $a = $('<a />').attr('href', '/articles/' + article.slug).css('display', 'block');

        var backImage = "url('" + article.image_url + "')";
        var $overlay = $('<div />').addClass('image-overlay').css('background-image', backImage);

        // var $img = $('<img />').attr('alt', article.image_title).attr('src', article.image_url);

        var $text = $('<div />').addClass('slick-slide-text');
        $text.append($('<h5 />').text(title));
        $text.append($('<h3 />').text(article.title));
        $a.append($overlay);
        // $a.append($img);
        $a.append($text);


        $tile.append($a);

        return $tile;
    };


    var startSlideShow = function() {

        var topic_slick_options = {
            dots: false,
            infinite: true,
            autoplay: false,
            autoplayspeed: 30000,
            slidesToShow: $(window).width() <= 660 ? 1: 3,
            slidesToScroll: $(window).width() <= 660 ? 1: 3,
            initialSlide: 0,
            prevArrow: '<img class="slick-left-blue" src="/images/topics/left_blue.png" />',
            nextArrow: '<img class="slick-right-blue" src="/images/topics/right_blue.png" />'
        };
        $(".topic_slider").slick(topic_slick_options);

        $('.topic_slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {
            var index = $('.slick-current .slide-item').data("index");
            $('.img-content .item').each(function() {
                $(this).removeClass('active');
                if ($(this).data("number") == index / 3) {
                    $(this).addClass('active');
                }
            });
        });

        $(".item").click(function() {
            $('.topics .item').each(function() {
                $(this).removeClass('active');
            });

            $(this).addClass('active');

            selectedId = $(this).attr('data-id');
            title = $(this).find('span').text();

            var i = $(".slide-item").length;
            while(i--) {
                $(".topic_slider").slick('slickRemove', i);
            }

            makeRequest(selectedId);
        })
    };

    startSlideShow();
    makeRequest(selectedId);
});