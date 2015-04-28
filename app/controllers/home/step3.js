import Ember from 'ember';

export default Ember.Controller.extend({
  	needs: ['application'],
  	isEnabled: function() {
  		if (this.get('controllers.application.customerDetails.name') && this.get('controllers.application.customerDetails.emailAddress')) {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.customerDetails.name','controllers.application.customerDetails.emailAddress'),

  	actions: {
  		back: function() {
  			if (this.get("controllers.application.selectedOrdertype")) {
  				var selectedOrdertype = this.get("controllers.application.selectedOrdertype");
  				var routeStr = "home.step2." + selectedOrdertype.identifier;
  				this.transitionTo(routeStr);
  			}
  			
  		}
  	}
});
