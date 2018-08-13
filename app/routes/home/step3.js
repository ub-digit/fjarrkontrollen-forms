import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';

export default Route.extend(ResetScroll, {

  actions: {
    nextstep: function() {
      this.transitionTo('home.step4');
    },
    back: function() {
      this.transitionTo('home.step2');
    }


  }
});
