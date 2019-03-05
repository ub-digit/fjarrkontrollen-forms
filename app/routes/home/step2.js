import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';

export default Route.extend(ResetScroll, {

  beforeModel: function() {

    var orderType = this.controllerFor('application').get('selectedOrderType');
    switch(orderType.identifier) {
      case 'article':
        this.transitionTo('home.step2.article');
        break;
      case 'book':
        this.transitionTo('home.step2.book');
        break;
      case 'chapter':
        this.transitionTo('home.step2.chapter');
        break;
      case 'score':
        this.transitionTo('home.step2.score');
        break;
      case 'microfilm':
        this.transitionTo('home.step2.microfilm');
        break;
      default:
        this.transitionTo('home.step1');
        break;
    }

  },

  actions: {
    nextstep: function() {
      this.transitionTo('home.step3');
    }
  }
});
