apos.define('bt-forms-widgets', {
  extend: 'apostrophe-widgets',
  construct: function(self, options) {
    self.play = function($widget, data, options) {

    	var $form = $widget.find('.bt-forms-widget'),
    			slug = $form.attr('data-form-slug'),
    			title = $form.attr('data-form-title'),
    			$submit = $widget.find('[data-form-submit="' + slug + '"]'),
    			$fields = $widget.find('[data-form-prompt]'),
					$msg = $widget.find('[data-form-message]').first(),
    			user = JSON.parse($form.attr('data-user'));

    	$submit.click(function(e) {
    		var form = {
    			title: title,
    			slug: slug,
    			timestamp: Math.round((new Date()).getTime() / 1000),
    			date: new Date(Date.now()).toLocaleString(),
    			'user_title': user.title,
    			'user_id': user._id,
    			'user_username': user.username,
    			'user_email': user.email,
					'articleId': window.apos && window.apos.contextPiece && window.apos.contextPiece._id
    		};

    		$fields.each(function(i, f) {
    			var fieldId = $(f).attr('data-form-field-id')
    			var $answer = $widget.find('[data-form-answer="'+slug+'_answer_'+fieldId+'"]')
    			var answer;

    			if ($answer.attr('type') === 'text') {
    				answer = $answer.first().val()
    			} else if ($answer.attr('type') === 'radio') {
    				answer = $answer.filter(':checked ').val()
    			}

    			form['question_' + fieldId] = $(f).text().trim();
    			form['answer_' + fieldId] = answer;
    		});

            console.log($msg);

            $msg.text('Submitting...');

    		$.post('/modules/bt-forms-widgets/submit', form, function(res) {

    			console.log('res', res);
                if (res === 'OK') {
                    $msg.text('Thank you!')
                } else {
                    $msg.text('Error submitting Assessment.')
                }
    		})
    	});

    }
  }
});