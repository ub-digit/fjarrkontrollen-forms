import Ember from 'ember';
import ResetScroll from '../../mixins/ResetScroll';

export default Ember.Route.extend(ResetScroll, {

  setupController: function(controller) {
    var application = this.container.lookup('application:main');
    controller.set('lang', application.locale);
  },

});
