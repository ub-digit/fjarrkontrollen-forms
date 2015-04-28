import Ember from 'ember';
import ENV from 'fjarrkontrollen-forms/config/environment';

export default Ember.Controller.extend({
  needs: ['application'],

  actions: { 
    save: function() {
      alert("skicka...");

      Ember.$.ajax({
        type: 'POST',
        url: ENV.APP.serviceURL + '/orders',
        data: JSON.stringify({
          order_type_id: 			this.get('controllers.application.selectedOrderType.id'),
          customer_type: 			this.get('controllers.application.selectedCustomerType.identifier'),
          form_library: 			this.get('controllers.application.selectedLocation.identifier'), // Change?

          title: 					this.get('controllers.application.orderDetails.articleTitle'),
          publication_year: 		this.get('controllers.application.orderDetails.publicationYear'),
          volume: 					this.get('controllers.application.orderDetails.volume'),
          issue: 					this.get('controllers.application.orderDetails.issue'),
          pages: 					this.get('controllers.application.orderDetails.pages'),
          journal_title: 			this.get('controllers.application.orderDetails.journalTitle'),
          isbn_issn: 				this.get('controllers.application.orderDetails.issn'),

          not_valid_after: 			this.get('controllers.application.orderDetails.notValidAfter'),
          comment: 					this.get('controllers.application.orderDetails.comment'),


		  name: 					this.get('controllers.application.customerDetails.name'),
		  email_address: 			this.get('controllers.application.customerDetails.emailAddress'),
		  phone_number: 			this.get('controllers.application.customerDetails.phoneNumber'),
		  company1: 				this.get('controllers.application.customerDetails.organisation'),
		  company2: 				this.get('controllers.application.customerDetails.department'),
		  company3: 				this.get('controllers.application.customerDetails.institution'),
		  library_card_number: 		this.get('controllers.application.customerDetails.libraryCardNumber'),
//TBD		  x_account: 				this.get('controllers.application.customerDetails.xAccount'), 


//TBD		  delivery_company: 		this.get('controllers.application.deliveryDetails.company'),
//TBD		  delivery_name: 			this.get('controllers.application.deliveryDetails.name'),
//TBD		  delivery_address: 		this.get('controllers.application.deliveryDetails.address'),
//TBD		  delivery_postal_code: 	this.get('controllers.application.deliveryDetails.postalCode'),
//TBD		  delivery_city: 			this.get('controllers.application.deliveryDetails.city'),


		  invoicing_name: 				this.get('controllers.application.invoicingDetails.name'),
//TBD		  invoicing_company: 			this.get('controllers.application.invoicingDetails.company'),
		  invoicing_address: 			this.get('controllers.application.invoicingDetails.address'),
		  invoicing_postal_address1: 	this.get('controllers.application.invoicingDetails.postalCode'),
		  invoicing_postal_address2:	this.get('controllers.application.invoicingDetails.city'),
		  invoicing_id: 				this.get('controllers.application.invoicingDetails.customerId')


        }),
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(response) {
        if (response.success === true) {
          console.log(response);
        } 
      },
      function(error) {
        console.log(error);
      });
    }
  }
});

