// TODO: Need to find a better way to initialise the required locals.

/*
 * GET home page.
 */

exports.index = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'ANWB Mobiel';
	req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'index', req.locals );
};



/*
 * GET contact page.
 */

exports.contact = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals.title = 'Contact';
	req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'contact', req.locals );
};



/*
 * GET privacy page.
 */

exports.privacy = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'Uw privacy';
req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'privacy', req.locals );
};



/*
 * GET vereniging page.
 */

exports.vereniging = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'Vereniging en bedrijf';
	req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'vereniging', req.locals );
};



/*
 * GET welkom page.
 */

exports.welkom = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'Welkom op m.anwb.nl!';
	req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'welkom', req.locals );
};



/*
 * GET wegenwacht page.
 */

exports.wegenwacht = function( req, res ) {
	res.header('Cache-Control', 'max-age=86400, public, must-revalidate');
	req.locals = req.locals || {};
	req.locals.title = 'Wegenwacht';
	req.locals.apptags = ['wegenwacht'];
	res.render( 'wegenwacht', req.locals );
};



/*
 * GET verkeer page.
 */

exports.verkeer = function( req, res ) {
	req.locals.title = 'Verkeersinformatie';
	req.locals.apptags = 'verkeer';
	res.render( 'verkeer', req.locals );
};



/*
 * GET main apps page.
 */

exports.apps = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	req.locals.title = 'Apps';
	req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'apps', req.locals );
};



/*
 * GET apps platform page.
 */

exports.apps_platform = function( req, res ) {
	res.header('Cache-Control', 'max-age=900, public, must-revalidate');
	req.locals.title = req.locals.apps.platform + ' apps';
	req.locals.apps = {apps:{}};
	req.locals.apptags = null;
	res.render( 'apps_platform', req.locals );
};
