import OrderDetailsController from 'frontend/mixins/order-details-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default OrderDetailsController.extend({
  i18n: inject(),

  isComposersValid: computed.notEmpty('applicationController.orderDetailsScore.composers'),

  isOpusTitleValid: computed.notEmpty('applicationController.orderDetailsScore.opusTitle'),

  isFormComplete: computed.and('isComposersValid', 'isOpusTitleValid'),

});
