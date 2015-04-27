import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('home', function() {
    this.route('step1');
    this.route('step2');
    this.route('step3');
    this.route('step4');
    this.route('step5');
  });

});

export default Router;
