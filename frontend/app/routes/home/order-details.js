import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';
import { storageFor } from 'ember-local-storage';

export default Route.extend(ResetScroll, {
  order: storageFor('order'),

  beforeModel: function() {
    let orderType = this.get('order.selectedOrderType');
    let routes = {
      photocopy: 'home.order-details.article',
      loan: 'home.order-details.book',
      photocopy_chapter: 'home.order-details.chapter',
      score: 'home.order-details.score',
      microfilm: 'home.order-details.microfilm'
    };
    this.transitionTo(routes[orderType]);
  }
});
