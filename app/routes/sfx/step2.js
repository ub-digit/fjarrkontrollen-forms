import Ember from 'ember';
import ResetScroll from '../../mixins/ResetScroll';

export default Ember.Route.extend(ResetScroll, {

  actions: {
    nextstep: function() {
      this.transitionTo('sfx.step3');
    },
    back: function() {
      this.transitionTo('sfx.step1');
    }
  }
});
