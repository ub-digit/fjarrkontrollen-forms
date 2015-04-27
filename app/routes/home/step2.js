import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    nextstep: function() {
      this.transitionTo('home.step3');
    }
  }
});
