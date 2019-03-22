import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { storageFor } from 'ember-local-storage';
import { inject } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: 'home.login',
  order: storageFor('order'),
  auth: inject(),

  triggerAuthentication() {
    // Only require authentication if current order state requires it
    if (this.get('auth.required')) {
      this._super(...arguments);
    }
  }
});
