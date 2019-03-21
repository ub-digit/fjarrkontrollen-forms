import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel: function() {
    // Or computed prop in application controller probably nicer?
    // TODO: Step should be computed property depending on global state
    let currentStep = this.controllerFor('application').get('order.currentStep') || 'home.step1';
    // Hack:
    if (currentStep != 'home.login') { //TODO: check for ticket param instead??
      this.replaceWith(currentStep);
    }
  }
});
