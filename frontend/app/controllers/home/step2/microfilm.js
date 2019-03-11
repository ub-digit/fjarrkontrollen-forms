import OrderDetailsController from 'frontend/mixins/order-details-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default OrderDetailsController.extend({
  i18n: inject(),

  isNewspaperValid: computed.notEmpty('applicationController.orderDetailsMicrofilm.newspaper'),

  isPeriodValid: computed.notEmpty('applicationController.orderDetailsMicrofilm.period'),

  isFormComplete: computed.and('isNewspaperValid', 'isPeriodValid'),

});
