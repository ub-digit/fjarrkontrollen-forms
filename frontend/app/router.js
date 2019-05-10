import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'}, function() {
    this.route('order-type', function() {});
    this.route('order-details', function() {
      this.route('article');
      this.route('book');
      this.route('chapter');
      this.route('score');
      this.route('microfilm');
    });
    this.route('customer-details');
    this.route('summary');
    this.route('confirmation');
    this.route('error');
    this.route('login');
  });
  this.route('sfx', function() {
    this.route('order-type');
    this.route('order-details');
    this.route('customer-details');
    this.route('summary');
    this.route('error');
  });
});

export default Router;
