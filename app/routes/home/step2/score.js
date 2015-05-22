import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('selectedOrderType.identifier') != 'score') {
      this.transitionTo('home.step1');
    }
  },
});
