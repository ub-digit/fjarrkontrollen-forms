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
  			if (this.get("controllers.application.selectedOrderType")) {
  				var selectedOrderType = this.get("controllers.application.selectedOrderType");
  				var routeStr = "home.step2." + selectedOrderType.identifier;
  				this.transitionTo(routeStr);
  			}
  			
  		}
  	}
});
