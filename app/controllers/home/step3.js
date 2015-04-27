import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  isDisabled: function() {
    if (this.get("controllers.application.selectedOrdertype")) {
      return false;
    }
    else {
      return true;
    }
  }.property('controllers.application.selectedOrdertype')
});
