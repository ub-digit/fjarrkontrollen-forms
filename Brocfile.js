/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
	  storeConfigInMeta: false,
	   fingerprint: {
			exclude: ['js', 'css']
    	}
});


// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.


/*
  This example is more verbose than necessary for the sake of illustration.
  You could, for example, include the Font Awesome assets as a Broccoli tree.
*/
app.import("bower_components/components-font-awesome/css/font-awesome.css");
app.import("bower_components/components-font-awesome/fonts/fontawesome-webfont.eot", { destDir: "fonts" });
app.import("bower_components/components-font-awesome/fonts/fontawesome-webfont.svg", { destDir: "fonts" });
app.import("bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf", { destDir: "fonts" });
app.import("bower_components/components-font-awesome/fonts/fontawesome-webfont.woff", { destDir: "fonts" });
app.import("bower_components/components-font-awesome/fonts/FontAwesome.otf", { destDir: "fonts" });

module.exports = app.toTree();


module.exports = app.toTree();
