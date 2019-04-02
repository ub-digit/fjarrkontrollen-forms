import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';
import { inject as injectService} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: injectController('application'),
  i18n: injectService(),
  queryParams: ['id'],

  orderAnotherText: computed('applicationController.selectedOrderType', function() {
    let translationKeys = {
      photocopy: 'home.step5.orderAnotherArticle',
      loan: 'home.step5.orderAnotherBook',
      photocopy_chapter: 'home.step5.orderAnotherChapter',
      score: 'home.step5.orderAnotherScore',
      microfilm: 'home.step5.orderAnotherMicrofilm'
    };
    let orderType = this.get('applicationController.selectedOrderType.label');
    return this.get('i18n').t(translationKeys[orderType]);
  })
});
