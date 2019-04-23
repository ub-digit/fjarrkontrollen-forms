import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default Route.extend({
  order: storageFor('order'),
  beforeModel() {
    this.set('order.orderPath', 'Web');
  }
});
