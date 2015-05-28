import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    var application = this.container.lookup('application:main');
    controller.set('lang', application.locale);
  }

});
