(function($) {

	/*
	 * Toont de gerelateerde apps van de actieve pagina.
	 */
	function toonGerelateerdeApps() {
		var   $content = $('.ui-page-active #content')
			, pageTags = $content.data('apptags')
			, appsFound = false

		$('.relatedApp').each(function() {
			if( $(this).data('apptags').indexOf( pageTags ) != -1 ) {
				// correcte app gevonden!
				$(this).removeClass('hidden');
				appsFound = true;
			}
		});

		if( appsFound ) {
			// Gerelateerde apps zijn gevonden, display de container.
			$('.relatedApps').removeClass('hidden');
		}
	}

	/*
	 * Verbergt alle gerelateerde apps.
	 */
	function hideApps() {
		$('.relatedApps').addClass('hidden');
		$('.relatedApp').addClass('hidden');
	}

	$(document).bind('pageshow', toonGerelateerdeApps);

	$(document).bind('pagehide', hideApps);


})(jQuery);