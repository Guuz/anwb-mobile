(function($) {



/*
 * Toont de gerelateerde apps van de actieve pagina.
 */
function toonGerelateerdeApps( e ) {
	var   $page = $(e.target)
		, appTags = $page.data('apptags')
		, $relatedApps = $page.find('.relatedApps')
		, $relatedApp = $relatedApps.find('.relatedApp')
		, appsFound = false

	// Stop als er niks (nieuws) te tonen is.
	if( !appTags || !$relatedApps.hasClass('hidden') ) {
		return;
	}

	$relatedApp.each(function() {
		var $this = $(this);

		if( $this.data('apptags').indexOf( appTags ) != -1 ) {
			// Correcte app gevonden!
			$this.removeClass('hidden');
			appsFound = true;
		}
	});

	if( appsFound ) {
		// Gerelateerde apps zijn gevonden; display de container.
		$relatedApps.removeClass('hidden');
	}
}

// TODO: This event seems to fire twice for each page that is shown.
$(document).bind('pagebeforeshow', toonGerelateerdeApps);



})(jQuery);
