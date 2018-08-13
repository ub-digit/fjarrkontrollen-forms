import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';

export default Route.extend(ResetScroll, {

  actions: {
    nextstep: function() {
      this.transitionTo('sfx.step3');
    },
    back: function() {
      this.transitionTo('sfx.step1');
    }
  }
});
