$(function() {
	// only if we're on an article page
	if (!$('.bt-article__body').length) {
		return
	}

	var $article = $('.bt-article__body'),
		$modal = $('.bt-term-modal'),
		modalBaseHtml = $modal.html(), 
		$screen = $('.bt-term-modal-screen')

	// fetch terms
	$.ajax('/api/v1/bt-glossary', {
		method: 'GET',
		dataType: 'json',
		error: function(err) {
			console.log('err', err)
		},
		success: function(res) {
			generateLinks(res.results)
		}
	})

	$article.on('click', '[data-bt-term]', function(e, elm) {
		var term = JSON.parse(decodeURIComponent($(this).attr('data-term')))
		resetModal()
		generateModal(term)
	})

	function generateLinks(terms) {
		var foundTerms = terms
			.map(function(t) {
				return {term: t, elm: locateTerm(t)}
			})
			.filter(function(t) {
				return !!t.elm
			})
		foundTerms.forEach(function(t) {
			t.elm.html(function(_, html) {
				var text = t.elm.text()
				var re = new RegExp('\\b(' + t.term.title + "[e]*[s]*)\\b", "i")
				var match = text.match(re)
				if (Array.isArray(match)) {
					match = match[0]
				}
				return html.replace(
					re,
					'<span class="bt-term" data-bt-term data-term=' +
						encodeURIComponent(JSON.stringify(t.term)) +
						'>' +
						match +
						'</span>'
				)
			})
		})
	}

	function locateTerm(term) {
		var $elm = $article.find(
			'[data-rich-text]:contains(' +
				term.title +
				'), [data-rich-text]:contains(' +
				term.title +
				's), [data-rich-text]:contains(' +
				term.title +
				'es), [data-rich-text]:contains(' +
				term.title.toLowerCase() +
				'), [data-rich-text]:contains(' +
				term.title.toLowerCase() +
				's), [data-rich-text]:contains(' +
				term.title.toLowerCase() +
				'es)'
		)
		return $elm.length ? $elm : false
	}

	function resetModal() {
		$modal.html(modalBaseHtml)
	}

	function generateModal(term) {
		var type = term.layoutType

		$modal.addClass('bt-term-modal--' + type)

		if (type === undefined || type === 'text') {
			$modal.find('.bt-term-modal__term').text(term.title)
			$modal.find('.bt-term-modal__def').text(term.description)
			$modal.find('.bt-term-modal__example').text(term.example)
		} else if (type === 'imageCaption' || type === 'textImage') {
			var imageUrl = ''
			try {
				imageUrl =
					term.image.items[0]._pieces[0].item.attachment._urls['one-half']
			} catch (e) {
				console.log(e)
			}

			$modal.find('.bt-term-modal__term').text(term.title)
			$modal.find('.bt-term-modal__def').text(term.description)
			$modal.find('.bt-term-modal__image').html('<img src="' + imageUrl + '"/>')
		}

		$modal.addClass('bt--active')
		$screen.addClass('bt--active')
	}

	$screen.click(function(e) {
		$modal.removeClass('bt--active')
		$screen.removeClass('bt--active')
	})
})

// <div class="bt-term-modal__term"></div>
// <div class="bt-term-modal__def"></div>
// <div class="bt-term-modal__example"></div>
