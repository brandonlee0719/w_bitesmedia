$(function() {

    //topics-detail
    var url_string = window.location.href;
    var url = new URL(url_string);
    var category = url.searchParams.get("category");
    var topics = {};
    var topicNameMap = {};
    var page = 0;
    var limit = 21;
    var hasMore = true;
    var loading = false;
    var selectedCategory = "";
    const topicMap = {
        "all": {
            title: "All Topics",
            icon: 'graph'
        },
        "science-and-technology": {
            title: "Science and Technology",
            icon: 'science'
        },
        "law-and-politics": {
            title: "Law and Politics",
            icon: 'law'
        },
        "sports-and-health": {
            title: "Sports and Health",
            icon: "health"
        },
        "life-and-arts": {
            title: "Life and Arts",
            icon: "life"
        }
    };

    var availableTags = []

    $('.topic-selection option').each(function(index, option) {
        topics[$(option).val()] = $(option).text();
        topicNameMap[$(option).text()] = $(option).val();
    });

    var topic = topicMap[category] || topicMap['all'];
    var selectedId = topicNameMap[topic.title];

    function getIconPath(icon) {
        return '/images/' + icon + '.png';
    }

    function setTopic(topic) {
        $(".topic-title-span").html(topic.title);
        $(".topic-selection").val(selectedId);
        $('.topics_image').attr('src', getIconPath(topic.icon));
    }

    if(topic) {
        $(".topic-selection").val(selectedId);
        setTopic(topic);
    }


/*
    var body = {
        category_id: articleId,
        href: window.location.href,
        blocks: blocks,
        user: user
    }
*/

    const makeRequest = function(selectedId, page) {
        const query = {};

        if(selectedId) {
            query.categoryIds = [selectedId];
        }

        let queryString = '?offset=' + (page * limit);
        queryString += selectedId !== 'all' ? '&q=' + encodeURIComponent(JSON.stringify(query)): '';

        loading = true;
        $.ajax('/api/v1/article-tiles' + queryString, {
            dataType: 'json',
            error: function(err) {
                console.log('err', err);
                loading = false;
            },
            success: function(res) {
                if (!res.results || !res.results.length) {
                    hasMore = false;
                    return;
                }
                loading = false;
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
        results.forEach(function (result) {
            const categoryId = result.categoryIds[0];
            const topic = getTopicById(categoryId);
            var $tile = createTile(result, topic && topic.title || '');
            $('.topics_body').append($tile);
        });
    };

    const createTile = function(article, categoryName) {
        var $tile = $('<div />').addClass('topics-item');
        var $a = $('<a />').attr('href', '/articles/' + article.slug).css('display', 'block');
        var backImage = "url('" + article.image_url + "')";
        var $overlay = $('<div />').addClass('image-overlay').css('background-image', backImage);

        // var $img = $('<img />').attr('alt', article.image_title).attr('src', article.image_url);

        var $text = $('<div />').addClass('topics-text');

        $text.append($('<h5 />').text(categoryName));
        $text.append($('<h3 />').text(article.title));
        $a.append($overlay);
        // $a.append($img);
        $a.append($text);
        $tile.append($a);

        return $tile;
    };

    function getTopicById(selectedId) {
        const name = topics[selectedId];
        let topic;
        for(var k in topicMap) {
            if(topicMap[k].title === name) {
                topic = topicMap[k];
            }
        }
        return topic;
    }

    makeRequest(selectedId, page);

    function changeTopic() {
        const topic = getTopicById(selectedId);

        setTopic(topic);

        // title = $('.topic-selection').find('option:selected').text();
        $('.topics_body').html('');

        // $(".topic-title-span").html(title);
        page = 0;
        hasMore = true;
        makeRequest(selectedId, page);
    }

    $(document).on('change', '.topic-selection', function(event) {
        selectedId = $(this).val();
        changeTopic(selectedId);
    });

    availableTags = Object.values(topics);
    
    $('#topic-search').autocomplete({
        source: availableTags,
        select: function(event, ui) {
            var selectedIndex = $.inArray(ui.item.value, availableTags);
            selectedId = Object.keys(topics)[selectedIndex];
            changeTopic(selectedId);
        }
    });

    $( window ).scroll(function() {
        // console.log($(".topics-item:last-of-type")[0], window.scrollY, (window.scrollY > $(".topics-item:last-of-type").offset().top * 0.75), hasMore, !loading);
        if($(".topics-item:last-of-type").length && (window.scrollY > $(".topics-item:last-of-type").offset().top * 0.75) && hasMore && !loading) {
            page++;
            makeRequest(selectedId, page);
        }
    });
});