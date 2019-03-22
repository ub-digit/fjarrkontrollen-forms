import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import UnAuthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
  session: inject(),

  routeIfAlreadyAuthenticated: 'home.step2',

  beforeModel(transition) {
    this._super(...arguments);
    let ticket = transition.queryParams.ticket;
    if (ticket) {
      let loginController = this.controllerFor('home.login');
      return this.get('session').authenticate('authenticator:cas', {
        cas_ticket: ticket,
        cas_service: loginController.get('serviceUrl')
      }).catch((error) => {
        console.log('error');
        console.dir(error);
      });
    }
  }
});
