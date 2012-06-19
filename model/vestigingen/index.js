var fs = require('fs')



/*
 * Returns all the vestigingen.
 */

exports.getVestigingen = function( req, res, next ) {
	req.locals = req.locals || {};

	var vestigingen = fs.readFileSync('./model/vestigingen/vestigingen.json','utf8');

	req.locals.vestigingen = JSON.parse( vestigingen ).vestigingen;
	next();
}
