import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as inject_service } from '@ember/service';
import { inject as inject_controller } from '@ember/controller';
import { storageFor } from 'ember-local-storage';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),
  order: storageFor('order'),

  isEnglish: computed('i18n.locale', function() {
    switch (this.get('i18n.locale')) {
      case 'sv':
        return false;
      default:
        return true;
    }
  }),

  optionLabelPath: computed('i18n.locale', function() {
    switch (this.get("i18n.locale")) {
      case 'sv':
        return 'content.name_sv';
      default:
        return 'content.name_en';
    }

  }),

  orderPreviewPartialName: computed('applicationController.order.selectedOrderType', function() {
    return 'sfx/step1/' + this.get('applicationController.order.selectedOrderType');
  }),

  isFormComplete: computed.and('applicationController.{selectedOrderType,selectedLocation}'),

  actions: {
    nextStep: function() {
      let step = 'sfx.step2';
      this.set('order.currentStep', step);
      this.transitionToRoute('sfx.step2');
    },
    handleSelectLocation: function(location) {
      this.set('applicationController.selectedLocation', location);
    }
  }
});
