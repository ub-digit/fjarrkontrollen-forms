import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isTitleValid: computed.notEmpty('applicationController.orderDetailsBook.bookTitle'),

  isAuthorsValid: computed.notEmpty('applicationController.orderDetailsBook.authors'),

  isFormComplete: computed('isTitleValid', 'isAuthorsValid', function() {
    return (this.get('isTitleValid') && this.get('isAuthorsValid'));
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
