import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    stepcancel: function() {
      this.transitionTo('home.step1');
    }
  }
});
