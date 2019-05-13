import OrderDetailsController from 'frontend/mixins/order-details-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default OrderDetailsController.extend({
  i18n: inject(),

  isTitleValid: computed.notEmpty('applicationController.orderDetailsBook.bookTitle'),

  isAuthorsValid: computed.notEmpty('applicationController.orderDetailsBook.authors'),

  isFormComplete: computed.and('isTitleValid', 'isAuthorsValid'),

});
