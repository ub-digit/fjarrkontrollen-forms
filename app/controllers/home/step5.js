import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['id'],

  orderAnotherText: Ember.computed('controllers.application.selectedOrderType', function() {

    var orderType = this.get("controllers.application.selectedOrderType");
    switch(orderType.identifier) {
      case 'article':
        return Ember.I18n.t('home.step5.orderAnotherArticle');
      case 'book':
        return Ember.I18n.t('home.step5.orderAnotherBook');
      case 'chapter':
        return Ember.I18n.t('home.step5.orderAnotherChapter');
      case 'score':
        return Ember.I18n.t('home.step5.orderAnotherScore');
      case 'microfilm':
        return Ember.I18n.t('home.step5.orderAnotherMicrofilm');
    }


  })

});
