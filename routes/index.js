/*
 * GET home page.
 */

exports.index = function( req, res ) {
	req.locals = req.locals || {};
	req.locals.title = 'ANWB Mobiel';
	res.render( 'index', req.locals );
};



/*
 * GET main apps page.
 */

exports.apps = function( req, res ) {
	req.locals.title = 'Apps';
	res.render( 'apps', req.locals );
};



/*
 * GET apps platform page.
 */

exports.apps_platform = function( req, res ) {
	req.locals.title = req.locals.apps.platform + ' apps';
	res.render( 'apps_platform', req.locals );
};
