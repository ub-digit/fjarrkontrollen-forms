import MaybeAuthenticatedRoute from 'frontend/mixins/maybe-authenticated-route';
import request from 'ic-ajax';
import $ from 'jquery';

export default MaybeAuthenticatedRoute.extend({
  actions: {
    getPubMedId: function(id) {
      if (window.dataLayer) {
        window.dataLayer.push({
          'event' : 'GAEvent',
          'eventCategory' : 'Click',
          'eventAction' : 'Get PubMed ID',
          'eventLabel' : id,
          'eventValue' : null
        });
      }

      var that = this;

      that.controllerFor('application').set('orderDetailsArticle.articleTitle', null);
      that.controllerFor('application').set('orderDetailsArticle.journalTitle', null);
      that.controllerFor('application').set('orderDetailsArticle.issn', null);
      that.controllerFor('application').set('orderDetailsArticle.publicationYear', null);
      that.controllerFor('application').set('orderDetailsArticle.volume', null);
      that.controllerFor('application').set('orderDetailsArticle.pages', null);
      that.controllerFor('application').set('orderDetailsArticle.issue', null);
      that.controllerFor('application').set('orderDetailsArticle.authors', null);
      $("body").addClass("loading");
      request('//eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + id +'&retmode=json').then(function(data) {

        // Kolla om pubmed ID är ogiltigt
        if (data.error) {
          $("body").removeClass("loading");
          that.controllerFor('home.step2.article').set('error', true);

          // Om pubmed ID inte är ogiltigt
        } else {

          that.controllerFor('home.step2.article').set('error', false);

          // Plocka ut första pubmed ID som returneras, då det inte alltid är samma som man frågade efter
          var resultId = data.result.uids[0];

          // Kolla om pubmed ID inte kan hittas
          if (data.result[resultId].error) {

            $("body").removeClass("loading");
            that.controllerFor('home.step2.article').set('error', true);

            // Om pbumed ID hittas
          } else {
            $("body").removeClass("loading");
            that.controllerFor('application').set('orderDetailsArticle.articleTitle', data.result[resultId].title);
            that.controllerFor('application').set('orderDetailsArticle.journalTitle', data.result[resultId].fulljournalname);
            that.controllerFor('application').set('orderDetailsArticle.issn', data.result[resultId].issn);
            that.controllerFor('application').set('orderDetailsArticle.publicationYear', data.result[resultId].pubdate);
            that.controllerFor('application').set('orderDetailsArticle.volume', data.result[resultId].volume);
            that.controllerFor('application').set('orderDetailsArticle.pages', data.result[resultId].pages);
            that.controllerFor('application').set('orderDetailsArticle.issue', data.result[resultId].issue);

            var authors = '';

            data.result[resultId].authors.forEach(function(item, index, a) {
              authors += item.name;
              if (index < a.length - 1) {
                authors += ', ';
              }
            });

            that.controllerFor('application').set('orderDetailsArticle.authors', authors);
          }
        }
      }, function() {
        that.controllerFor('home.step2.article').set('error', true);
      });
    }
  }
});
