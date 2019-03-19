import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';
import { storageFor } from 'ember-local-storage';

export default Route.extend(ResetScroll, {
  order: storageFor('order'),

  beforeModel: function() {
    let orderType = this.get('order.selectedOrderType');
    let routes = {
      article: 'home.step2.article',
      loan: 'home.step2.book',
      chapter: 'home.step2.chapter',
      score: 'home.step2.score',
      microfilm: 'home.step2.microfilm'
    };
    this.transitionTo(routes[orderType]);
  }
});
