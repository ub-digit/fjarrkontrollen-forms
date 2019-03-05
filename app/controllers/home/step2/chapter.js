import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isChapterTitleValid: computed.notEmpty('applicationController.orderDetails.chapter.chapterTitle'),

  isBookTitleValid: computed.notEmpty('applicationController.orderDetails.chapter.bookTitle'),

  isFormComplete: computed('applicationController.{orderDetails.chapter.chapterTitle,orderDetails.chapter.bookTitle}', function() {
    return (this.get('isChapterTitleValid') && this.get('isBookTitleValid'));
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
