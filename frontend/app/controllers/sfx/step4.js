import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as injectController } from '@ember/controller';
import { inject as injectService } from '@ember/service';

export default Controller.extend({
  applicationController: injectController('application'),
  i18n: injectService(),
  queryParams: ['id'],

  //TODO: Controller base class/mixin for this:
  orderAnotherText: computed('applicationController.selectedOrderType', function() {
    let translationKeys = {
      article: 'home.step5.orderAnotherArticle',
      book: 'home.step5.orderAnotherBook',
      chapter: 'home.step5.orderAnotherChapter',
      score: 'home.step5.orderAnotherScore',
      microfilm: 'home.step5.orderAnotherMicrofilm'
    };
    let orderType = this.get('applicationController.selectedOrderType.label');
    return this.get('i18n').t(translationKeys[orderType]);
  })

});
