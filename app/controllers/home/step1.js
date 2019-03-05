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

  isFormComplete: computed.and('applicationController.{selectedOrderType,selectedLocation}'),

  actions: {
    nextStep: function() {
      this.transitionToRoute('home.step2');
    },
    handleSelectType: function(type) {
      this.set('applicationController.selectedOrderType', type);
    },
    handleSelectLocation: function(location) {
      this.set("applicationController.selectedLocation", location);
    }
  }

});
