$(function() {
    $(document).on('click', '.select_item', function(event) {
        const id = $('.bite_breakdown').attr('data-id');
        const option = $(this).attr('data-option');

        $.post('/api/v1/poll/' + id, {response: option}, function(result, status) {
            $('.option-container').addClass('completed');
            $('.result-container').addClass('completed');

            const height_a = result.results.a * 4;
            const height_b = result.results.b * 4;
            $('.result-a').text(result.results.a + '% said ' + $('.item_a .detail').text());
            $('.result-bar-a').css('height', height_a + 'px');
            $('.result-b').text(result.results.b + '% said ' + $('.item_b .detail').text());
            $('.result-bar-b').css('height', height_b + 'px');

            $('.result-bar-' + option).addClass('active');
        });

    });
});