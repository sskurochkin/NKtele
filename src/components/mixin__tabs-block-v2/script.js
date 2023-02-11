window.addEventListener('load', function () {

	$('[data-tab-id]').click(function () {
		const id = $(this).attr('data-tab-id');
		$(this).closest('.tabs-wrap').find('[data-tab-id]').removeClass('active');
		$(this).addClass('active');
		console.log($(this).closest('div'))
		$(this).closest('.tabs-wrap').find('[data-tab-content]').addClass('hidden');
		$(this).closest('.tabs-wrap').find(`[data-tab-content="${id}"]`).removeClass('hidden');
		document.dispatchEvent(new Event('tabchange'));
	})
})