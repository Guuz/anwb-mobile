var   http = require('http')
	, fs = require('fs')
	, jsdom = require('jsdom')



/*
 * Manages the verkeers feed from www.anwb.nl.
 */

exports.getFeed = function( req, res, next ) {
	req.locals = req.locals || {};
	req.locals.verkeer = {}

	fs.readFile('./model/verkeer/verkeer.json','utf8', function( err, data ) {
		if( err ) {
			next( new Error('Failed to get vekeer feed.' + err) );
		} else {
			req.locals.verkeer.feed = JSON.parse( data );
			next();
		}
	});
}


/*
 * Download the feed from www.anwb.nl.
 */

exports.downloadVerkeerFeed = function( callback ) {
	var options = {
		host: 'www.anwb.nl',
		port: 80,
		path: '/feeds/verkeer/verkeersinformatie',
		headers: {
			'Pragma': 'no-cache, no-store'
		}
	};

	var req = http.get( options, function( res ) {
		if( res.statusCode != 200 ) {
			callback('Verkeer feed response code was ' + res.statusCode);
			return;
		}

		var data = '';

		res.on('data', function( chunk ) {
			data += chunk;
		});

		res.on('end', function() {
			fs.writeFile('./model/verkeer/verkeer.json', data, 'UTF-8', function( err ) {
				if( err ) {
					callback('Writing verkeer feed: ' + err.message);
				} else {
					callback(null, 'Finished downloading verkeer feed.');
				}
			})
		});

		res.on('error', function( e ) {
			callback('Downloading verkeer feed: ' + e.message);
		});
	});
}

/*
 * Retrieves the information for displaying traffic jam information.
 */
exports.getTrafficJamFeed = function( req, res, next ) {
	req.locals = req.locals || {};
	req.locals.verkeer = req.locals.verkeer || {}

	fs.readFile('./model/verkeer/trafficjams.json','utf8', function( err, data ) {
		if( err ) {
			next( new Error('Failed to get traffic jam feed.' + err) );
		} else {
			req.locals.verkeer.trafficjam = JSON.parse( data );
			next();
		}
	});
}

/*
 * Downloads the traffic jam information from anwb.nl
 */
exports.downloadTrafficjamFeed = function( callback ) {
	var options = {
		host: 'http://www.anwb.nl',
		port: 80,
		path: '/verkeer/verkeersinformatie_files_nl',
		headers: {
			'Pragma': 'no-cache, no-store'
		}
	}
		, files = [];

	/*
	 * Since the traffic jam information is not available as a json feed, we need to scrape it from the anwb website.
	 */
	jsdom.env({
		html: options.host + options.path,
		scripts: [
			'http://code.jquery.com/jquery-1.7.2.min.js'
		],
		done: function(errors, window) {
			var $ = window.$;
			// Retrieve the correct information from the page.
			$('.verkeerslijst li').each(function() {
				var fileinfo = {
					road: $(this).attr('id')
					, description: $(this).find('p').text()
					, km: $(this).find('em').text()
				};
				files.push( fileinfo );
			});
			// Write all the information to the correct json file.
			fs.writeFile('./model/verkeer/trafficjams.json', JSON.stringify( files ), 'UTF-8', function( err ) {
				if( err ) {
					callback('Writing traffic jam feed: ' + err.message);
				} else {
					callback(null, 'Finished downloading traffic jam feed.');
				}
			});
		}
	});
}
