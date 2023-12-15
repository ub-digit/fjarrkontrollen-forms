import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { inject as injectController } from '@ember/controller';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';
import UnAuthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
  session: inject(),
  order: storageFor('order'),

  routeIfAlreadyAuthenticated: computed('order.orderPath', function() {
    return this.get('order.orderPath') === 'SFX' ? 'home.customer-details' : 'home.order-details';
  })
});
