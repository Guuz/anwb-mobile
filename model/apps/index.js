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
		apps.apps = _androidApps;
		apps.apps.concat( _iosApps );
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
						{
							platform: 'Android'
							, name: 'Verkeer'
							, version: '1.1'
							, description: 'Snel en eenvoudig files en flitsers checken kan nu altijd en overal.'
							, link: 'https://play.google.com/store/apps/details?id=com.themobilecompany.ANWBVerkeer'
							, tags: ['verkeer']
						},
						{
							platform: 'Android'
							, name: 'Wegenwacht'
							, version: '1.1'
							, description: 'Een handige hulp bij pech, maar zeker ook om pech te voorkomen! Met de Wegenwacht applicatie van de ANWB kunt u snel en gemakkelijk in contact komen met de Wegenwacht.'
							, link: 'https://play.google.com/store/apps/details?id=com.themobilecompany.ANWBWegenwacht'
							, tags: ['wegenwacht']
						},
						{
							platform: 'Android'
							, name: 'Reishulp'
							, version: '1.1'
							, description: 'Met de ANWB Reishulp applicatie heeft u alle belangrijke informatie op –en over- uw vakantiebestemming direct bij de hand.'
							, link: 'https://play.google.com/store/apps/details?id=com.themobilecompany.Reishulp'
							, tags: ['reishulp', 'wegenwacht']
						},
						{
							platform: 'Android'
							, name: 'Land van ANWB'
							, version: '1.0'
							, description: 'Met de Land van ANWB App heeft u informatie over de leukste uitjes van Nederland direct bij de hand.'
							, link: 'https://play.google.com/store/apps/details?id=com.afrogleap.anwb'
							, tags: ['vrijetijd']
						}
					];

var _iosApps = [
					{
						platform: 'IOS'
						, name: 'Verkeer'
						, version: '2.0.1'
						, description: 'Snel en eenvoudig files en flitsers checken kan nu altijd en overal.'
						, link: 'http://itunes.apple.com/nl/app/anwb-verkeer/id325937652?mt=8'
						, tags: ['verkeer']
					}
				];
