import OrderDetailsController from 'frontend/mixins/order-details-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default OrderDetailsController.extend({
  i18n: inject(),
  isArticleTitleValid: computed.notEmpty('applicationController.orderDetailsArticle.articleTitle'),
  isPagesValid: computed.notEmpty('applicationController.orderDetailsArticle.pages'),
  isPublicationYearValid: computed.notEmpty('applicationController.orderDetailsArticle.publicationYear'),
  isJournalTitleValid: computed.notEmpty('applicationController.orderDetailsArticle.journalTitle'),
  isFormComplete: computed.and('isArticleTitleValid', 'isPagesValid', 'isPublicationYearValid', 'isJournalTitleValid'),
  isGetArticleDetailsButtonEnabled: computed.notEmpty('applicationController.orderDetailsArticle.articleIdentifier'),
});
