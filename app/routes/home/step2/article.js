import Ember from 'ember';
import request from 'ic-ajax';


export default Ember.Route.extend({

  actions: {
    getPubMedId: function(id) {

      var that = this;

      console.log('getPubMedId', id);

      request('http://eutils.ncbi.nlm.nih.gov/_entrez/eutils/esummary.fcgi?db=pubmed&id=' + id +'&retmode=json').then(function(data) {

        if (data.error) {

          that.controllerFor('home.step2.article').set('error', true);

          // Här behövs felhantering
          console.log('Error');

        } else {

          that.controllerFor('application').set('orderDetails.article.articleTitle', data.result[id].title);
          that.controllerFor('application').set('orderDetails.article.journalTitle', data.result[id].fulljournalname);
          that.controllerFor('application').set('orderDetails.article.issn', data.result[id].issn);
          that.controllerFor('application').set('orderDetails.article.publicationYear', data.result[id].pubdate);
          that.controllerFor('application').set('orderDetails.article.volume', data.result[id].volume);
          that.controllerFor('application').set('orderDetails.article.pages', data.result[id].pages);
          that.controllerFor('application').set('orderDetails.article.issue', data.result[id].issue);

          var authors = '';

          data.result[id].authors.forEach(function(item, index, a) {
            authors += item.name;
            if (index < a.length - 1) {
              authors += ', ';
            }
          });

          that.controllerFor('application').set('orderDetails.article.authors', authors);
        }

      });
    }
  }

});
