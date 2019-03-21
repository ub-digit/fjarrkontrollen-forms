import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: 'home.login',

  triggerAuthentication() {
    // Only require authentication if current order state requires it
    if (this.controllerFor('application').get('authRequired')) {
      this._super(...arguments);
    }
  }
});
