/**
 * Module dependencies.
 */

var   express = require('express')
	, routes = require('./routes')
	, util = require('util')
	, apps = require('./model/apps')
	, vestigingen = require('./model/vestigingen')
	, verkeer = require('./model/verkeer')

var app = module.exports = express.createServer();



/**
 * Configuration
 */

// In production log with a 'short' format.
app.configure('production', function() {
	app.use( express.logger('short') );
});
// For development we log in the 'dev' format.
app.configure('development', function() {
	app.use( express.logger('dev') );
});

app.configure(function() {
	app.set( 'views', __dirname + '/views' );
	app.set( 'view engine', 'jade' );
	app.use( express.bodyParser() );
	app.use( express.methodOverride() );
	app.use('/', express.static(__dirname + '/public', { maxAge: 24*60*60*1000 }) );
	app.use( app.router );
});

// Different kind of error exposure on development and production.
// Don't minify the HTML in development.
app.configure('development', function() {
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
	app.set('view options', { pretty: true, layout: false });
});
app.configure('production', function() {
	app.use( express.errorHandler() );
	app.set('view options', { pretty: false, layout: false });
});



/**
 * Routes
 */

app.get('/', routes.index);
app.get('/apps', apps.getAppsCount, routes.apps);
app.get('/contact', vestigingen.getVestigingen, routes.contact);
app.get('/privacy', routes.privacy);
app.get('/vereniging', routes.vereniging);
app.get('/verkeer', verkeer.getFeed, apps.getApps, routes.verkeer);
app.get('/apps/:platform', apps.getApps, routes.apps_platform);


app.get('*', function(req, res) {
	// Temporarily log a warning to test the stderr logfile.
	console.warn('404 on', req.url);
	res.send('not found...', 404);
});



/**
 * Download the verkeer feed from www.anwb.nl.
 */

verkeer.downloadVerkeerFeed( function( err, result ) {
	verkeerFeedLoop(err, result);
});

function verkeerFeedLoop( err, result ) {
	if( err ) {
		console.warn( err );
	} else if ( result ) {
		util.log( result );
	}

	setTimeout(function() {
		verkeer.downloadVerkeerFeed( verkeerFeedLoop );
	}, 1000*60);
}



/**
 * Startup
 */

var port = process.env.PORT || 3000;
app.listen( port );
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
