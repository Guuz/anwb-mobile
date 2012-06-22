/*
 * GET home page.
 */

exports.index = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'ANWB Mobiel';
	res.render( 'index', req.locals );
};



/*
 * GET contact page.
 */

exports.contact = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals.title = 'Contact';
	res.render( 'contact', req.locals );
};



/*
 * GET privacy page.
 */

exports.privacy = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'Uw privacy';
	res.render( 'privacy', req.locals );
};



/*
 * GET vereniging page.
 */

exports.vereniging = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'Vereniging en bedrijf';
	res.render( 'vereniging', req.locals );
};



/*
 * GET verkeer page.
 */

exports.verkeer = function( req, res ) {
	req.locals.title = 'Verkeersinformatie';
	res.render( 'verkeer', req.locals );
};



/*
 * GET main apps page.
 */

exports.apps = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	req.locals.title = 'Apps';
	res.render( 'apps', req.locals );
};



/*
 * GET apps platform page.
 */

exports.apps_platform = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	req.locals.title = req.locals.apps.platform + ' apps';
	res.render( 'apps_platform', req.locals );
};
