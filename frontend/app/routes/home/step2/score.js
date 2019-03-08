import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('selectedOrderType.identifier') !== 'score') {
      this.transitionTo('home.step1');
    }
  },
});
