/*
 * GET home page.
 */

exports.index = function( req, res ) {
	res.render( 'index' );
};

/*
 * GET apps page.
 */

exports.apps = function( req, res ) {
	res.render( 'apps', req.locals );
};
