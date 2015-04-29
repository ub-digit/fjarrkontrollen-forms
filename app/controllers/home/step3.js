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

    isCustomerTypeSet: function() {
        if (this.get('controllers.application.selectedCustomerType')){
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.selectedCustomerType'),

    isBillableFlag: function() {
        // If the flag isBillable is set
        // AND
        // If customertype is  one of "Sahlgrenska" or "Company"
        // return true else false
        //alert('isBillable:'+this.get('controllers.application.isBillable'));
        if ((this.get('controllers.application.selectedCustomerType.identifier') === 'sahl') || (this.get('controllers.application.selectedCustomerType.identifier') === 'ftag')){
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.selectedCustomerType','controllers.application.isBillable'),

    isShippableFlag: function() {
        // If the flag isShippable is set
        // AND
        // If customertype is not one of "Student" or "Private person"
        // return true else false
        //alert('isShippableFlag:'+this.get('controllers.application.isShippable'));
        if (
                (this.get('controllers.application.selectedCustomerType') !== null)&&
                (this.get('controllers.application.selectedCustomerType.identifier') !== 'stud') && 
                (this.get('controllers.application.selectedCustomerType.identifier') !== 'priv')
           ){
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.selectedCustomerType','controllers.application.isShippable'),

    showDeliveryInfoForm: function() {
        if (
                (this.get('controllers.application.selectedDeliveryMethod.identifier') === 'send')
           )
        {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.selectedCustomerType','controllers.application.selectedDeliveryMethod'),

    showDeliveryInfoText: function() {
        var alster = 'alster:' + "\n";
        alster = 'selectedDeliveryMethod: '+ this.get('controllers.application.selectedDeliveryMethod.identifier');
        alster = alster + "\n";
        alster = alster + 'isShippable:'+this.get('controllers.application.isShippable');
        alster = alster + "\n";
        alster = alster + 'selectedCustomerType:'+this.get('controllers.application.selectedCustomerType.identifier');
        //alert(alster);
        if (
                (this.get('controllers.application.selectedDeliveryMethod.identifier') === 'pickup')
                ||
                (this.get('controllers.application.isShippable') === false)
                ||
                ((this.get('controllers.application.isShippable') === true) && ((this.get('controllers.application.selectedCustomerType.identifier') === 'priv')||(this.get('controllers.application.selectedCustomerType.identifier') === 'stud'))
                )
           )
        {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.selectedCustomerType','controllers.application.selectedDeliveryMethod'),

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
