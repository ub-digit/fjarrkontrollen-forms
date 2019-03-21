import OrderDetailsController from 'frontend/mixins/order-details-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default OrderDetailsController.extend({
  i18n: inject(),

  isChapterTitleValid: computed.notEmpty('applicationController.orderDetailsChapter.chapterTitle'),

  isBookTitleValid: computed.notEmpty('applicationController.orderDetailsChapter.bookTitle'),

  isFormComplete: computed.and('isChapterTitleValid', 'isBookTitleValid'),

});
