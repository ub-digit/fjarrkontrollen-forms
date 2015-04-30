import Ember from 'ember';
import request from 'ic-ajax';


export default Ember.Route.extend({

  actions: {
    getPubMedId: function(id) {

      var that = this;

      that.controllerFor('application').set('orderDetails.article.articleTitle', null);
      that.controllerFor('application').set('orderDetails.article.journalTitle', null);
      that.controllerFor('application').set('orderDetails.article.issn', null);
      that.controllerFor('application').set('orderDetails.article.publicationYear', null);
      that.controllerFor('application').set('orderDetails.article.volume', null);
      that.controllerFor('application').set('orderDetails.article.pages', null);
      that.controllerFor('application').set('orderDetails.article.issue', null);
      that.controllerFor('application').set('orderDetails.article.authors', null);
      Ember.$("body").addClass("loading");
      request('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + id +'&retmode=json').then(function(data) {

        // Kolla om pubmed ID är ogiltigt
        if (data.error) {
          Ember.$("body").removeClass("loading");
          that.controllerFor('home.step2.article').set('error', true);

        // Om pubmed ID inte är ogiltigt
        } else {

          that.controllerFor('home.step2.article').set('error', false);

          // Plocka ut första pubmed ID som returneras, då det inte alltid är samma som man frågade efter
          var resultId = data.result.uids[0];

          // Kolla om pubmed ID inte kan hittas
          if (data.result[resultId].error) {

            that.controllerFor('home.step2.article').set('error', true);

          // Om pbumed ID hittas
          } else {
            Ember.$("body").removeClass("loading");
            that.controllerFor('application').set('orderDetails.article.articleTitle', data.result[resultId].title);
            that.controllerFor('application').set('orderDetails.article.journalTitle', data.result[resultId].fulljournalname);
            that.controllerFor('application').set('orderDetails.article.issn', data.result[resultId].issn);
            that.controllerFor('application').set('orderDetails.article.publicationYear', data.result[resultId].pubdate);
            that.controllerFor('application').set('orderDetails.article.volume', data.result[resultId].volume);
            that.controllerFor('application').set('orderDetails.article.pages', data.result[resultId].pages);
            that.controllerFor('application').set('orderDetails.article.issue', data.result[resultId].issue);

            var authors = '';

            data.result[resultId].authors.forEach(function(item, index, a) {
              authors += item.name;
              if (index < a.length - 1) {
                authors += ', ';
              }
            });

            that.controllerFor('application').set('orderDetails.article.authors', authors);
          }
        }
      }, function() {

        that.controllerFor('home.step2.article').set('error', true);

      });
    }
  }

});
