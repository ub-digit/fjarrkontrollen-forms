import Ember from 'ember';

export default Ember.Controller.extend({
  	needs: ['application'],

  	// Should probably be a different validation
    isEnabled: function() {
  		if (this.get('controllers.application.customerDetails.name') && this.get('controllers.application.customerDetails.emailAddress')) {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.customerDetails.name','controllers.application.customerDetails.emailAddress'),


    // Bool to check if customer type is set
    isCustomerTypeSet: Ember.computed.notEmpty('controllers.application.selectedCustomerType'),


    // Observes selected customer type and resets selected delivery method to null
    resetShippingMethod: Ember.observer('controllers.application.selectedCustomerType', function() {

      this.set('controllers.application.selectedDeliveryMethod', null);

    }),


    isInvoicingAvaliable: Ember.computed('controllers.application.selectedCustomerType', 'controllers.application.isBillable', 'isCustomerTypeSet', function () {

      var sahlgrenskaOrCompany = (this.get('controllers.application.selectedCustomerType.identifier') === 'sahl' || this.get('controllers.application.selectedCustomerType.identifier') === 'ftag');

      return (this.get('controllers.application.isBillable') && sahlgrenskaOrCompany && this.get('isCustomerTypeSet'));

    }),

    /*

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
    */



    // Bool to check if shipping is available as an option, based on
    //  - Customer type has been set, and
    //  - Customer type is not student or private, and
    //  - Order type is shippable
    isShippingAvailable: Ember.computed('controllers.application.selectedCustomerType','controllers.application.isShippable', 'isCustomerTypeSet', function() {

      var studentOrPrivate = (this.get('controllers.application.selectedCustomerType.identifier') === 'stud' || this.get('controllers.application.selectedCustomerType.identifier') === 'priv');

      return (this.get('controllers.application.isShippable') && !studentOrPrivate && this.get('isCustomerTypeSet'));

    }),


    /*
    isShippableFlag: function() {
      // If the flag isShippable is set
      // AND
      // If customertype is not one of "Student" or "Private person"
      // return true else false
      //alert('isShippableFlag:'+this.get('controllers.application.isShippable'));
      if (
        (this.get('controllers.application.selectedCustomerType') !== null) &&
        (this.get('controllers.application.selectedCustomerType.identifier') !== 'stud') &&
        (this.get('controllers.application.selectedCustomerType.identifier') !== 'priv')
       ){
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.selectedCustomerType','controllers.application.isShippable'),
    */


    // Bool to check if delivery information form should be displayed, based on
    //  - If shipping is available as an option, and
    //  - If shipping is the selected delivery option
    showDeliveryInfoForm: Ember.computed('isShippingAvailable', 'controllers.application.selectedDeliveryMethod.identifier', function() {

      return (this.get('isShippingAvailable') && this.get('controllers.application.selectedDeliveryMethod.identifier') === 'send');

    }),


    /*
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
    */


    // Bool to check if delivery info text should be displayed, based on
    //  - Pickup is the selected delivery option, or shipping is unavailable as an option, and
    //  - Customer type has been set, and
    showDeliveryInfoText: Ember.computed('isShippingAvailable', 'controllers.application.selectedDeliveryMethod.identifier', 'isCustomerTypeSet', function() {

      return ((this.get('controllers.application.selectedDeliveryMethod.identifier') === 'pickup') || !this.get('isShippingAvailable')) && this.get('isCustomerTypeSet');

    }),


    /*
    showDeliveryInfoText: function() {


      var alster = 'alster:' + "\n";
      alster = 'selectedDeliveryMethod: '+ this.get('controllers.application.selectedDeliveryMethod.identifier');
      alster = alster + "\n";
      alster = alster + 'isShippable:'+this.get('controllers.application.isShippable');
      alster = alster + "\n";
      alster = alster + 'selectedCustomerType:'+this.get('controllers.application.selectedCustomerType.identifier');
      //alert(alster);


      if (
          (this.get('controllers.application.selectedDeliveryMethod.identifier') === 'pickup') ||
          (this.get('controllers.application.isShippable') === false) ||
          (
            (this.get('controllers.application.isShippable') === true) &&
            (
              (this.get('controllers.application.selectedCustomerType.identifier') === 'priv') ||
              (this.get('controllers.application.selectedCustomerType.identifier') === 'stud')
            )
        )
      )
      {
        return true;
      }
      else {
        return false;
      }
    }.property('controllers.application.selectedCustomerType','controllers.application.selectedDeliveryMethod'),
    */


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
