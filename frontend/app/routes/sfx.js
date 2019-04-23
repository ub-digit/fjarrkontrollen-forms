import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default Route.extend({
  order: storageFor('order'),

  beforeModel: function() {
    let currentStep = this.get('order.currentStep') || 'sfx.step1';
    this.replaceWith(currentStep);
  }
});
