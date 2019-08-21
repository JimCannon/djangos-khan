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

		$('.badge-danger').click(function() {
			const url = $(this).data('url');
			$.ajax({ url, method: 'DELETE' }).then(function() {
				location.reload();
			}).fail(function(err) {
				console.log(err);
			});
		});
	}

	function submitAdminModal($modal) {
		const $form = $modal.find('form');

		$.post($form[0].action, $form.serialize()).then(function() {
			location.reload();
		}).fail(function(err) {
			let text = 'Something went wrong';

			if (err.status === 401) {
				text = 'Access denied';
			}

			$modal.find('.alert').text(err && err.responseJSON && err.responseJSON.err.message || text).removeClass('d-none');
		});
	}

	admin();
});