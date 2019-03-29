import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { computed } from '@ember/object';

export default Service.extend({
  order: storageFor('order'),
  orderTypes: null,
  required: computed('orderTypes', 'order.selectedOrderType', function() {
    if (this.get('order.selectedOrderType')) {
      let orderType = this.get('orderTypes').findBy('label', this.get('order.selectedOrderType'));
      return orderType['auth_required'];
    }
    else {
      return false;
    }
  })
});
