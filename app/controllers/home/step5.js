import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),
  queryParams: ['id'],

  orderAnotherText: computed('applicationController.selectedOrderType', function() {

    var orderType = this.get("applicationController.selectedOrderType");
    switch(orderType.identifier) {
      case 'article':
        return this.get("i18n").t('home.step5.orderAnotherArticle');
      case 'book':
        return this.get("i18n").t('home.step5.orderAnotherBook');
      case 'chapter':
        return this.get("i18n").t('home.step5.orderAnotherChapter');
      case 'score':
        return this.get("i18n").t('home.step5.orderAnotherScore');
      case 'microfilm':
        return this.get("i18n").t('home.step5.orderAnotherMicrofilm');
    }
  })
});
