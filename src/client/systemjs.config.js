/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            "system-npm/*": "node_modules/system-npm/*.js"
        },
        // map tells the System loader where to look for things
        map: {
            "npm": "system-npm",
            "npm-extension": "system-npm/npm-extension",
            // our app is within the app folder
            app: '',
            // packages tells the System loader how to load when no filename and/or no extension
        },
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
