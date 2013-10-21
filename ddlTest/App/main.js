requirejs.config({
    paths: {
        'text': "../Scripts/text",
        'ko': "../Scripts/knockout-2.3.0",
        'postal': "../Scripts/postal",
        'underscore': "../Scripts/underscore.min",
        'amplify': "../Scripts/amplify",
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        'toastr': '../Scripts/toastr'
    }
});

define('jquery', [], function () { return jQuery; });
define('knockout', [], function () { return ko; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'service/logger'],
    function (system, app, viewLocator) {
        system.debug(true);

        app.configurePlugins({
            router: true,
            dialog: true,
            widget: true
        });

        app.start().then(function () {
            viewLocator.useConvention();
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });
