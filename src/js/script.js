$(document).ready(function() {
	function admin() {
		$('.modal form').submit(function(e) {
			e.preventDefault();
			const $modal = $(this).closest('.modal');
			submitAdminModal($modal);
		});

		$('.modal .btn-primary').click(function() {
			const $modal = $(this).closest('.modal');
			submitAdminModal($modal);
		});
	}

	function submitAdminModal($modal) {
		const $form = $modal.find('form');

		$.post($form[0].action, $form.serialize()).then(function() {
			location.reload();
		}).fail(function(err) {
			console.error(err.responseJSON)
			$modal.find('.alert').text(err.responseJSON.err.message || err.responseJSON).removeClass('d-none');
		});
	}

	admin();
});