import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    resetForm: function() {
    	// reset forms here... 
      this.transitionTo('home.step1');
    }
  }
});
