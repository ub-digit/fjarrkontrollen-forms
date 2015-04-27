import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    savestep: function() {
      this.transitionTo('home.step1');
    }
  }
});
