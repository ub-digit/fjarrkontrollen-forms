import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  orderAnotherText: Ember.computed('controllers.application.selectedOrderType', function() {

    var orderType = this.get("controllers.application.selectedOrderType");
    switch(orderType.identifier) {
      case 'article':
        return Ember.I18n.t('home.step5.orderAnotherArticle');
        break;
      case 'book':
        return Ember.I18n.t('home.step5.orderAnotherBook');
        break;
      case 'chapter':
        return Ember.I18n.t('home.step5.orderAnotherChapter');
        break;
      case 'score':
        return Ember.I18n.t('home.step5.orderAnotherScore');
        break;
      case 'microfilm':
        return Ember.I18n.t('home.step5.orderAnotherMicrofilm');
        break;
    };


  })

});
