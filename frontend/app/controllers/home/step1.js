import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isEnglish: computed('i18n.locale', function() {
    switch (this.get('i18n.locale')) {
      case 'sv':
        return false;
      default:
        return true;
    }
  }),

  isFormComplete: computed.and('applicationController.order.{selectedOrderType,selectedLocation}'),

  actions: {
    nextStep: function() {
      let step = 'home.step2';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }

});
