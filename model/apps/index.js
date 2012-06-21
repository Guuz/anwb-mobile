/*
 * Returns all the apps for the specific platform.
 */

exports.getApps = function( req, res, next ) {
	var apps = {};
	req.locals = req.locals || {};

	// Android
	if( req.params.platform == 'android' ) {
		apps.platform = 'Android';
		apps.apps = _androidApps;

	// iOS
	} else if( req.params.platform == 'ios' ) {

		apps.platform = 'iOS';
		apps.apps = _iosApps;

	// Other
	} else {
		apps.platform = 'All';
		apps.apps = [];
		for( var i in _androidApps ) {
			// Voeg de androidApps toe aan alle apps.
			apps.apps.push( _androidApps[i] );
		}
		for( var i in _iosApps ) {
			// Voeg de iosApps toe aan alle apps.
			apps.apps.push( _iosApps[i] );
		}
	}

	req.locals.apps = apps
	next();
}



/*
 * Returns the number of apps per platform.
 */

exports.getAppsCount = function( req, res, next ) {
	req.locals = req.locals || {};

	req.locals.appsCount = {
		  android: _androidApps.length
		, ios: _iosApps.length
	}

	next();
}





var _androidApps = [
						new App(
							 'Android'
							, 'Verkeer'
							, '1.1'
							, 'Snel en eenvoudig files en flitsers checken kan nu altijd en overal.'
							, 'https://play.google.com/store/apps/details?id=com.themobilecompany.ANWBVerkeer'
							, ['verkeer']
						),
						new App(
							'Android'
							, 'Wegenwacht'
							, '1.1'
							, 'Een handige hulp bij pech, maar zeker ook om pech te voorkomen! Met de Wegenwacht applicatie van de ANWB kunt u snel en gemakkelijk in contact komen met de Wegenwacht.'
							, 'https://play.google.com/store/apps/details?id=com.themobilecompany.ANWBWegenwacht'
							, ['wegenwacht']
						),
						new App(
							'Android'
							, 'Reishulp'
							, '1.1'
							, 'Met de ANWB Reishulp applicatie heeft u alle belangrijke informatie op –en over- uw vakantiebestemming direct bij de hand.'
							, 'https://play.google.com/store/apps/details?id=com.themobilecompany.Reishulp'
							, ['reishulp', 'wegenwacht']
						),
						new App(
							'Android'
							, 'Land van ANWB'
							, '1.0'
							, 'Met de Land van ANWB App heeft u informatie over de leukste uitjes van Nederland direct bij de hand.'
							, 'https://play.google.com/store/apps/details?id=com.afrogleap.anwb'
							, ['vrijetijd']
						)
					];

var _iosApps = [
					new App(
						'IOS'
						, 'Verkeer'
						, '2.0.1'
						, 'Snel en eenvoudig files en flitsers checken kan nu altijd en overal.'
						, 'http://itunes.apple.com/nl/app/anwb-verkeer/id325937652?mt=8'
						, ['verkeer']
					)
				];

/*
 * App class, bevat alle data/logica van de apps.
 */
function App( platform, name, version, description, link, tags ) {
	this.platform = platform;
	this.name = name;
	this.version = version;
	this.description = description;
	this.link = link;
	this.tags = tags;
}
