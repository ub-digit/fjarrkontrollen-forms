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
      photocopy: 'home.confirmation.orderAnotherArticle',
      loan: 'home.confirmation.orderAnotherBook',
      photocopy_chapter: 'home.confirmation.orderAnotherChapter',
      score: 'home.confirmation.orderAnotherScore',
      microfilm: 'home.confirmation.orderAnotherMicrofilm'
    };
    let orderType = this.get('applicationController.selectedOrderType.label');
    return this.get('i18n').t(translationKeys[orderType]);
  })
});
