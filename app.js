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

var verkeerFeedTimeout = 1000*60;



/**
 * Configuration
 */

// In production log with a 'short' format.
app.configure('production', function() {
	app.use( express.logger() );
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
app.get('/welkom', routes.welkom);
app.get('/contact', vestigingen.getVestigingen, routes.contact);
app.get('/privacy', routes.privacy);
app.get('/vereniging', routes.vereniging);
app.get('/wegenwacht', apps.getApps, routes.wegenwacht);
app.get('/verkeer', verkeer.getFeed, verkeer.getTrafficJamFeed, apps.getApps, routes.verkeer);
app.get('/apps/:platform', apps.getApps, routes.apps_platform);


app.get('*', function(req, res) {
	res.send('Pagina niet gevonden...', 404);
});



/**
 * Download the verkeer feed from www.anwb.nl.
 */

verkeer.downloadVerkeerFeed( function( err, result ) {
	verkeerFeedLoop(err, result);
});
// Download traffic jam information.
// FIXME: this seems to cause a memory leak of some sort.
// Disabling it for now to test this.
//verkeer.downloadTrafficjamFeed( trafficjamFeedLoop );

function trafficjamFeedLoop( err, result ) {
	if( err ) {
		console.warn( err );
	} else if ( result ) {
		util.log( result );
	}

	setTimeout(function() {
		verkeer.downloadTrafficjamFeed( trafficjamFeedLoop );
	}, verkeerFeedTimeout);
}

function verkeerFeedLoop( err, result ) {
	if( err ) {
		console.warn( err );
	} else if ( result ) {
		util.log( result );
	}

	setTimeout(function() {
		verkeer.downloadVerkeerFeed( verkeerFeedLoop );
	}, verkeerFeedTimeout);
}



/**
 * Startup
 */

var port = process.env.PORT || 3000
  , ip = process.env.IP || '0.0.0.0'

app.listen( port, ip, function() {  
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
