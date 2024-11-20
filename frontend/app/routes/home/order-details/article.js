import ENV from 'frontend/config/environment';
import MaybeAuthenticatedRoute from 'frontend/mixins/maybe-authenticated-route';
import request from 'ic-ajax';
import $ from 'jquery';

export default MaybeAuthenticatedRoute.extend({
  actions: {
    getArticleDetails: function(id) {
      if (window.dataLayer) {
        window.dataLayer.push({
          'event' : 'GAEvent',
          'eventCategory' : 'Click',
          'eventAction' : 'Get Article Details ID',
          'eventLabel' : id,
          'eventValue' : null
        });
      }
      let applicationController = this.controllerFor('application');

      applicationController.set('orderDetailsArticle.articleTitle', null);
      applicationController.set('orderDetailsArticle.journalTitle', null);
      applicationController.set('orderDetailsArticle.issn', null);
      applicationController.set('orderDetailsArticle.publicationYear', null);
      applicationController.set('orderDetailsArticle.volume', null);
      applicationController.set('orderDetailsArticle.pages', null);
      applicationController.set('orderDetailsArticle.issue', null);
      applicationController.set('orderDetailsArticle.authors', null);
      applicationController.set('orderDetailsArticle.resolvedArticleIdentifer', null);
      applicationController.set('orderDetailsArticle.resolvedArticleIdentiferSource', null);

      $("body").addClass("loading");

      let isDoi = id.includes('/');
      if (isDoi) {
        request(ENV.APP.serviceUrl + '/scopus/' + id).then((data) => {
          $("body").removeClass("loading");
          if (data.error) {
            this.controllerFor('home.order-details.article').set('error', true);
          }
          else {
            applicationController.set('orderDetailsArticle.articleTitle', data.title);
            applicationController.set('orderDetailsArticle.journalTitle', data.journal_title);
            applicationController.set('orderDetailsArticle.issn', data.issn);
            applicationController.set('orderDetailsArticle.publicationYear', data.pubyear);
            applicationController.set('orderDetailsArticle.volume', data.volume);
            applicationController.set('orderDetailsArticle.pages', data.pages);
            applicationController.set('orderDetailsArticle.issue', data.issue);
            applicationController.set('orderDetailsArticle.authors', data.authors);
            applicationController.set('orderDetailsArticle.resolvedArticleIdentifer', id);
            applicationController.set('orderDetailsArticle.resolvedArticleIdentiferSource', 'scopus');
          }
        }, () => {
          this.controllerFor('home.order-details.article').set('error', true);
        });
      }
      else {
        request(ENV.APP.serviceUrl + '/pubmed/' + id).then((data) => {
          $("body").removeClass("loading");
          if (data.error) {
            this.controllerFor('home.order-details.article').set('error', true);
          } else {
            this.controllerFor('home.order-details.article').set('error', false);

            // Plocka ut första pubmed ID som returneras, då det inte alltid är samma som man frågade efter
            var resultId = data.result.uids[0];

            // Kolla om pubmed ID inte kan hittas
            if (data.result[resultId].error) {
              this.controllerFor('home.order-details.article').set('error', true);

              // Om pbumed ID hittas
            } else {
              applicationController.set('orderDetailsArticle.articleTitle', data.result[resultId].title);
              applicationController.set('orderDetailsArticle.journalTitle', data.result[resultId].fulljournalname);
              applicationController.set('orderDetailsArticle.issn', data.result[resultId].issn);
              applicationController.set('orderDetailsArticle.publicationYear', data.result[resultId].pubdate);
              applicationController.set('orderDetailsArticle.volume', data.result[resultId].volume);
              applicationController.set('orderDetailsArticle.pages', data.result[resultId].pages);
              applicationController.set('orderDetailsArticle.issue', data.result[resultId].issue);

              let authors = [];
              data.result[resultId].authors.forEach((item) => {
                authors.push(item.name)
              });

              applicationController.set('orderDetailsArticle.authors', authors.join(', '));
              applicationController.set('orderDetailsArticle.resolvedArticleIdentifer', id);
              applicationController.set('orderDetailsArticle.resolvedArticleIdentiferSource', 'pubmed');

            }
          }
        }, () => {
          this.controllerFor('home.order-details.article').set('error', true);
        });
      }
    }
  }
});
