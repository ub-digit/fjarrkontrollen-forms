import Ember from 'ember';
import request from 'ic-ajax';


export default Ember.Route.extend({

  actions: {
    getPubMedId: function(id) {

      var that = this;

      console.log('getPubMedId', id);

      var r = request('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=' + id +'&retmode=json').then(function(data){

        if (data.error) {

          // Här behövs felhantering
          console.log('ERROR');

        } else {

          that.controllerFor('application').set('orderDetails.articleTitle', data.result[id].title);
          that.controllerFor('application').set('orderDetails.journalTitle', data.result[id].fulljournalname);
          that.controllerFor('application').set('orderDetails.issn', data.result[id].issn);
          that.controllerFor('application').set('orderDetails.publicationYear', data.result[id].pubdate);
          that.controllerFor('application').set('orderDetails.volume', data.result[id].volume);
          that.controllerFor('application').set('orderDetails.pages', data.result[id].pages);
          that.controllerFor('application').set('orderDetails.issue', data.result[id].issue);

          var authors = '';

          data.result[id].authors.forEach(function(item, index, a) {
            authors += item.name;
            if (index < a.length - 1) authors += ', ';
          });

          that.controllerFor('application').set('orderDetails.authors', authors);
        }

      });
    }
  }

});
