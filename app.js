/**
 * Module dependencies.
 */

var   express = require('express')
	, routes = require('./routes')
	, apps = require('./model/apps')
	, vestigingen = require('./model/vestigingen')

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
	app.use('/', express.static(__dirname + '/public') );
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
app.get('/apps/:platform', apps.getApps, routes.apps_platform);


app.get('*', function(req, res){
	res.send('not found...', 404);
});



/**
 * Startup
 */

var port = process.env.PORT || 3000;
app.listen( port );
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
