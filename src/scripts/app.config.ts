declare var System: any;

// @if isDev
System
	.config({
		packages: { 'js': { defaultExtension: 'js' } }
	});

System
	.import('js/app.js')
	.catch(console.error.bind(console));
// @endif

// @if isProd
System
	.config({
		bundles: { 'js/app.js': ['app'] }
	});

System
	.import('app')
	.catch(console.error.bind(console));
// @endif
