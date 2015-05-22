import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  orderAnotherText: Ember.computed('controllers.application.selectedOrderType', function() {

    console.log(Ember.I18n.t('home.step5.back'));

    return 'BestÄll en till då!';

  })

});
