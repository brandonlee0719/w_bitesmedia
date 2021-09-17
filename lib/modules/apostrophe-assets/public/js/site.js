$(function () {
    // user menu
    var $userMenuTrigger = $('.bt-header__user'),
        $userMenu = $('.bt-header__user__menu')

    if ($userMenuTrigger.length) {
        $userMenuTrigger.click(function (e) {
            $userMenu.toggleClass('bt--active');
        });
    }

    if ($(".text_slider").length) {
        // slide show
        var slick_options = {
            dots: true,
            infinite: true,
            arrows: true,
            autoplay: false,
            autoplayspeed: 13000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
        };

        $(".text_slider").slick(slick_options);
    }

    if ($(".main_image_title").length) {
        var home_slick_options = {
            dots: false,
            infinite: true,
            arrows: true,
            autoplay: true,
            autoplayspeed: 8000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            prevArrow: '<img class="slick-left-white" src="/images/left.png" />',
            nextArrow: '<img class="slick-right-white" src="/images/right.png" />'
        };

        $(".main_image_title").slick(home_slick_options);

        $(".main_image_title .slide-item").click(function () {
            var link = $(this).find("img").data("link");
            location.href = link;
        });
    }

    if ($(".select_item").length) {
        $(".select_item").click(function () {
            $('.select_item').each(function () {
                $(this).removeClass('active');
            });
            $('.select_item').each(function () {
                $('.select_item').removeClass('_active');
            });

            $(this).addClass('active');
            $(this).find('.detail').addClass('_active');
        })
    }

    if ($(".read_btn").length) {
        $(".read_btn").mousedown(function () {
            $(this).addClass('active_btn');
        })
        $(".read_btn").mouseup(function () {
            $(this).removeClass('active_btn');
        });
    }

    if ($('.all-view').length) {
        var view_all = false;
        $('.all-view').click(function () {
            if (view_all) {
                $('.all-view').text("VIEW ALL");
                view_all = false;
            } else {
                $('.all-view').text("VIEW LESS");
                view_all = true;
            }
            $(".popular-item.more").each(function () {
                $(this).toggle();
            })
        });
    }

    if($(".bt-home").length) {

        $.get('/api/v1/students/assignments', function (data) {

            const createTile = function(tile, i) {
                var $tile_container = $('<div />').addClass('bt-home-marquee__item apos-slideshow-item').attr('data-index', i);
                $tile_container.append($('<img />').attr('data-image', true).attr('src', tile.articleImage));

                var $tile = $('<div />').addClass('bt-inner home-slick-slide-text');

                $tile.css('background-image', 'url(' + tile.articleImage + ')');
                $tile.css('background-size', 'cover');


                const path = '/articles/' + tile.articleSlug;
                var $text = $('<div />').addClass('bt-home-marquee__item__body');
                $text.append($('<div />').addClass('bt-home-marquee__item__title bt-color--white mb3 bt--heavy').text(tile.name));
                $text.append($('<div />').addClass('bt-home-marquee__item__subtitle bt-color--white').text('Assigned to You'));
                const $read_btn = $('<a />').addClass('bt-button').attr('href', path).html($('<span />').text('Read It'));
                $read_btn.append($('<span />'));
                const $read_btn_container = $('<div />').addClass('bt-home-marquee__item__button').html($read_btn);
                $text.append($read_btn_container);
                $tile.append($text);
                $tile_container.append($tile);
                return $tile_container;
            };


            var i = $(".slick-slide").length;
            while(i--) {
                $(".main_image_title").slick('slickRemove', i);
            }

            if(data.results.length) {
                data.results.forEach(function(result, idx) {
                    var $tile = createTile(result, idx);
                    $(".main_image_title").slick('slickAdd', $tile);
                });

            }


            /*function toggleCollapsed() {
                $assignments_container.toggleClass('collapsed');
                $collapseIcon.toggleClass('rotateHalf');

                $.cookie('sa-bar-collapsed', $assignments_container.hasClass('collapsed'));
            }

            if (data.results.length) {
                var $assignments_container = $('<div />').addClass('student-assignments-bar');
                var $collapseIcon = $('<i />').addClass('sa-collapse-icon fa fa-angle-down bt-color--white transition');

                $assignments_container.append($collapseIcon);

                $collapseIcon.click(toggleCollapsed);

                var $assignments = $('<div />').addClass('flex');

                var $label = $('<div />').addClass('assignment-label').text('Your Assignments: ');
                $assignments.append($label);

                var $container = $('<div />').addClass('student-assignment-container');
                data.results.forEach(function (result) {
                    var $assignment = $('<div />').addClass('student-assignment');
                    // var $overlay = $('<div />').addClass('image-overlay');
                    var $a = $('<a />').attr('href', '/articles/' + result.articleSlug).css('display', 'block').css('background-image', 'url(' +result.articleImage + ')');
                    var $title = $('<div />').addClass('sa-title').text(result.name);
                    var $due_date = $('<div />').addClass('sa-due-date').text('Due ' + result.endDate);

                    // $a.append($overlay);
                    $a.append($title);
                    $a.append($due_date);
                    $assignment.append($a);
                    $container.append($assignment);
                });

                $assignments.append($container);
                $assignments_container.append($assignments);

                $('.bt-header').before($assignments_container);


                if($.cookie('sa-bar-collapsed') === "true") {
                    toggleCollapsed();
                }

            }
            */
        });
    }

//redirect URL when login success.
    var currentURL =  window.location.href;
    var previousURL = localStorage.getItem("URL");

    var loginFlag = apos.user ? true : false;

    if (currentURL != previousURL && currentURL.indexOf("/login") < 0) {
        if (loginFlag && previousURL && !localStorage.getItem('flag')) {
            document.location.href = previousURL;
            currentURL = previousURL;
            localStorage.setItem('flag', true);
        }
        if(!loginFlag) {
            localStorage.setItem('flag', '');
        }
        localStorage.setItem("URL", currentURL);
    }

// hide sound-icon in articles page
    var sound_icon = document.getElementById('sound-icon');
    if(window.location.href.match('/articles/')) {
        sound_icon.classList.add('display-none');
    }
    else {
        sound_icon.classList.remove('display-none');
    }

// Text highlight
    var highlight_flag = false
    $('#highlight-icon-1').hide();
    $('#highlight-icon').click(function(){
        $('#highlight-icon').hide();
        $('#highlight-icon-1').show();
        highlight_flag = true;
    });
    $('#highlight-icon-1').click(function(){
        $('#highlight-icon').show();
        $('#highlight-icon-1').hide();
        highlight_flag = false;
    });

//write note click
    var notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : {};
    var noteKey = localStorage.getItem('notes') ? Object.keys(JSON.parse(localStorage.getItem('notes'))).length : 0;
    var write_note_flag = false;
    $('#write-note').click(function(){
        write_note_flag = !write_note_flag;
    });

    window.onmouseup = mouseup;
    function mouseup(event){
        if(highlight_flag){
            window.getSelection().getRangeAt(0).surroundContents($('<span class="highlight_style" />')[0]);
        }

        var posX = event.clientX;
        var posY = event.clientY;

        var note_div = "";
        note_div += '<div class="note_div" data-key="' + noteKey + '" style="top: ' + posY + 'px; left: ' + posX + 'px;">';
        note_div += '<button onclick="close_note(this)" class="note_close">';
        note_div += '<img src="/images/close.png" style="width: 10px;">';
        note_div += '</button>';
        note_div += '<textarea class="note"></textarea>';
        note_div += '</div>';

        if(write_note_flag){
            $("body").append(note_div);
            write_note_flag = !write_note_flag;
            noteKey++
        }
    }

    $(document).on( "focusout", ".note_div", function(e, i) {
        const key = $(this).attr('data-key');
        const note = {
            msg: $(this).find('textarea').val(),
            x: parseInt($(this).css( "left" )),
            y: parseInt($(this).css( "top" ))
        }
    
        notes[key] = note
        localStorage.setItem("notes", JSON.stringify(notes));
        $(this).css('z-index', '100');
    });
    
    $(document).on( "focus", ".note_div", function(e, i) {
        $(this).css('z-index', '101');        
    });
    
    var localStorageNotes = localStorage.getItem("notes");
    localStorageNotes = JSON.parse(localStorageNotes);
    
    var temp = Object.keys(localStorageNotes).map(function(key) {
        return temp = localStorageNotes[key];
    });

    for(let i= 0; i<temp.length; i++){
        var note_div = "";
        note_div += '<div class="note_div" data-key="' + i + '" style="top: ' + temp[i].y + 'px; left: ' + temp[i].x + 'px;">';
        note_div += '<button onclick="close_note(this)" class="note_close">';
        note_div += '<img src="/images/close.png" style="width: 10px;">';
        note_div += '</button>';
        note_div += '<textarea class="note">' + temp[i].msg + '</textarea>';
        note_div += '</div>';
        $("body").append(note_div);
    }
});

function close_note(el) { 
    var parent = $(el).parent();
    parent.remove();

    var index = $(parent).data('key');
    var tempNotes = JSON.parse(localStorage.getItem('notes'));
    delete tempNotes[index];
    
    localStorage.setItem("notes", JSON.stringify(tempNotes));
}
