import Service from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { computed } from '@ember/object';

export default Service.extend({
  order: storageFor('order'),
  orderTypes: null,
  required: computed('orderTypes', 'order.selectedOrderType', function() {
    let order_type = this.get('orderTypes').findBy('label', this.get('order.selectedOrderType'));
    return order_type['auth_required'];
  })
});
