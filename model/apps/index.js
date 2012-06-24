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
	),
	new App(
		'Android'
		, 'Weg Pech'
		, '1.0'
		, 'Hoeveel gestrande leden kan jij binnen de aangegeven tijd weer op weg helpen? De Wegenwacht heeft maar 1 doel; leden met pech zo snel mogelijk weer op weg helpen. Kan jij dat ook? Help jij gestrande leden weer op weg binnen de aangegeven tijd? Ga dan nu de strijd aan met je familie en vrienden in het officiële ANWB Wegenwacht spel.'
		, 'https://play.google.com/store/apps/details?id=nl.anwb.android.wegpech'
		, ['wegenwacht', 'games']
	)
];

var _iosApps = [
	new App(
		'iOS'
		, 'Verkeer'
		, '2.0.1'
		, 'Snel en eenvoudig files en flitsers checken kan nu altijd en overal.'
		, 'http://itunes.apple.com/nl/app/anwb-verkeer/id325937652?mt=8'
		, ['verkeer']
	),
	new App(
		'iOS'
		, 'Voordeel'
		, '1.0.2'
		, 'Gezellig uit eten en profiteren van een aantrekkelijk voordeel; Als ANWB lid ontvangt je tussen de 10 en 25% korting op de rekening bij geselecteerde restaurants in heel Nederland.'
		, 'http://itunes.apple.com/us/app/anwb-voordeel/id368039700?mt=8'
		, ['algemeen']
	),
	new App(
		'iOS'
		, 'Reishulp'
		, '1.0'
		, 'Met de ANWB Reishulp applicatie heeft u alle belangrijke informatie op –en over- uw vakantiebestemming direct bij de hand. Zo kunt u in spoedeisende gevallen direct contact opnemen met de ANWB Alarmcentrale of –voor minder spoedeisende vragen- met de ANWB Reisdokter. Ook heeft u digitaal uw medische geschiedenis bij de hand die vertaald kan worden in maar liefst 8 talen.'
		, 'http://itunes.apple.com/nl/app/anwb-reishulp/id450730951?mt=8'
		, ['wegenwacht', 'reishulp']
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
