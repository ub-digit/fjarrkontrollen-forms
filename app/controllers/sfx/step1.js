import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as inject_service } from '@ember/service';
import { inject as inject_controller } from '@ember/controller';

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

  optionLabelPath: computed('i18n.locale', function() {
		switch (this.get("i18n.locale")) {
			case 'sv':
				return 'content.title_sv';
			default:
				return 'content.title_en';
		}

	}),

  orderPreviewPartialName: computed('applicationController.selectedOrderType.identifier', function() {
    return 'sfx/step1/' + this.get('applicationController.selectedOrderType.identifier');
  }),

	isFormComplete: computed.and('applicationController.{selectedOrderType,selectedLocation}'),

	actions: {
		nextStep: function() {
			this.transitionToRoute('sfx.step2');
		},
    handleSelectLocation: function(location) {
      this.set("applicationController.selectedLocation", location);
    }
	}
});
