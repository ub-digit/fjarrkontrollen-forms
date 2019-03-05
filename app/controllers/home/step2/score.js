import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isComposersValid: computed.notEmpty('applicationController.orderDetails.score.composers'),

  isOpusTitleValid: computed.notEmpty('applicationController.orderDetails.score.opusTitle'),


  isFormComplete: computed('isComposersValid', 'isOpusTitleValid', function() {
    return (this.get('isComposersValid') && this.get('isOpusTitleValid'));
  }),

  actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		},
		nextStep: function() {
			this.transitionToRoute("home.step3");
		}
  }
});
