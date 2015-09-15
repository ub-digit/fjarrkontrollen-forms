import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('home', {path: '/'}, function() {
    this.route('step1', function() {});
    this.route('step2', function() {
      this.route('article');
      this.route('book');
      this.route('chapter');
      this.route('score');
      this.route('microfilm');
    });
    this.route('step3');
    this.route('step4');
    this.route('step5');
    this.route('error');
  });
  this.route('sfx', function() {
    this.route('step1');
    this.route('step2');
    this.route('step3');
    this.route('step4');
    this.route('error');
  });
});

export default Router;
