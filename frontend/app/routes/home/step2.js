import Route from '@ember/routing/route';
import ResetScroll from '../../mixins/ResetScroll';

export default Route.extend(ResetScroll, {

  beforeModel: function() {
    let applicationController = this.controllerFor('application');
    var orderType = applicationController.get('selectedOrderType');
    let step = null;
    switch(orderType.identifier) {
      case 'article':
        step = 'home.step2.article';
        //applicationController.set('order.currentStep', step);
        this.transitionTo(step);
        break;
      case 'book':
        step = 'home.step2.book';
        //applicationController.set('order.currentStep', step);
        this.transitionTo(step);
        break;
      case 'chapter':
        step = 'home.step2.chapter';
        //applicationController.set('order.currentStep', step);
        this.transitionTo(step);
        break;
      case 'score':
        step = 'home.step2.score';
        //applicationController.set('order.currentStep', step);
        this.transitionTo(step);
        break;
      case 'microfilm':
        step = 'home.step2.microfilm';
        //applicationController.set('order.currentStep', step);
        this.transitionTo('home.step2.microfilm');
        break;
      default:
        step = 'home.step1';
        //applicationController.set('order.currentStep', step);
        this.transitionTo(step);
        break;
    }
  }
});
