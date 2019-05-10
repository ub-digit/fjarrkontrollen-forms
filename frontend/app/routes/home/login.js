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
    return this.get('order.orderPath') === 'SFX' ? 'home.step3' : 'home.order-details';
  }),

  beforeModel(transition) {
    this._super(...arguments);
    let ticket = transition.queryParams.ticket;
    if (ticket) {
      let loginController = this.controllerFor('home.login');
      return this.get('session').authenticate('authenticator:cas', {
        cas_ticket: ticket,
        cas_service: loginController.get('serviceUrl')
      }).then(() => {
        this.set('order.currentStep', this.get('routeIfAlreadyAuthenticated'));
      }, (error) => {
        console.log('error');
        console.dir(error);
      });
    }
  }
});
