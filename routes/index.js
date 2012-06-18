/*
 * GET home page.
 */

exports.index = function( req, res ) {
	res.render( 'index' );
};

/*
 * GET main apps page.
 */

exports.apps = function( req, res ) {
	res.render( 'apps' );
};

/*
 * GET apps platform page.
 */

exports.apps_platform = function( req, res ) {
	res.render( 'apps_platform', req.locals );
};
