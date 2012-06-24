// TODO: Need to find a better way to initialise the required locals.

/*
 * GET home page.
 */

exports.index = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	initLocals(req, res, 'ANWB Mobiel');
	res.render( 'index', req.locals );
};



/*
 * GET contact page.
 */

exports.contact = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	initLocals(req, res, 'Contact');
	res.render( 'contact', req.locals );
};



/*
 * GET privacy page.
 */

exports.privacy = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	initLocals(req, res, 'Uw privacy');
	res.render( 'privacy', req.locals );
};



/*
 * GET vereniging page.
 */

exports.vereniging = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	initLocals(req, res, 'Vereniging en bedrijf');
	res.render( 'vereniging', req.locals );
};



/*
 * GET welkom page.
 */

exports.welkom = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	initLocals(req, res, 'Welkom op m.anwb.nl!');
	res.render( 'welkom', req.locals );
};



/*
 * GET wegenwacht page.
 */

exports.wegenwacht = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	initLocals(req, res, 'Wegenwacht');
	req.locals.apptags = ['wegenwacht'];
	res.render( 'wegenwacht', req.locals );
};



/*
 * GET verkeer page.
 */

exports.verkeer = function( req, res ) {
	initLocals(req, res, 'Verkeersinformatie');
	req.locals.apptags = ['verkeer'];
	res.render( 'verkeer', req.locals );
};



/*
 * GET main apps page.
 */

exports.apps = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	initLocals(req, res, 'Apps');
	res.render( 'apps', req.locals );
};



/*
 * GET apps platform page.
 */

exports.apps_platform = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	initLocals(req, res, req.locals.apps.platform + ' apps');
	res.render( 'apps_platform', req.locals );
};

/*
 * Initializes the locals object in the request object.
 */
function initLocals( req, res, title ) {
	req.locals = req.locals || {};
	req.locals.title = title;
	req.locals.apps = req.locals.apps || {apps:{}};
	req.locals.apptags = null;
}
