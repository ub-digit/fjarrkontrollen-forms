import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
		var locations = [];
		locations.pushObject({id:1, identifier: 'G', title: 'Humanistiska biblioteket', title_en: 'Humanities Library'});
		locations.pushObject({id:2, identifier: 'Ge', title: 'Ekonomiska biblioteket', title_en: 'Economics Library'});
		locations.pushObject({id:3, identifier: 'Gg', title: 'Geovetenskapliga biblioteket med kulturvård', title_en: 'Earth Sciences and Conservation Library'});
		locations.pushObject({id:4, identifier: 'Gm', title: 'Biomedicinska biblioteket', title_en: 'Biomedical Library'});
		locations.pushObject({id:5, identifier: 'Gp', title: 'Pedagogiska biblioteket', title_en: 'Education Library'});
		locations.pushObject({id:6, identifier: 'Gk', title: 'Samhällsvetenskapliga biblioteket', title_en: 'Social Sciences Library'});
		locations.pushObject({id:7, identifier: 'Ghdk', title: 'Konstbiblioteket', title_en: 'Art Library'});
		locations.pushObject({id:8, identifier: 'Gumu', title: 'Biblioteket för musik och dramatik', title_en: 'Music and Drama Library'});
		controller.set("locations", locations);
		controller.set("selectedLocation", null);

		var orderTypes = [];
		orderTypes.pushObject({id:1, identifier: 'article', title: 'Artikelkopia', title_en: 'Photocopy'});
		orderTypes.pushObject({id:2, identifier: 'book', title: 'Lån', title_en: 'Loan'});
		orderTypes.pushObject({id:3, identifier: 'chapter', title: 'Kopia av bokkapitel', title_en: 'Book chapter photocopy'});
		orderTypes.pushObject({id:4, identifier: 'score', title: 'Musiktryck', title_en: 'Score'});
		orderTypes.pushObject({id:5, identifier: 'microfilm', title: 'Mikrofilmad dagstidning', title_en: 'Loan micro-film'});
		controller.set("orderTypes", orderTypes);
		controller.set("selectedOrderType", null);

		var customerTypes = [];
		customerTypes.pushObject({id:1, identifier: 'univ', title: 'Forskare/anställd', title_en: 'Researcher/staff'});
		customerTypes.pushObject({id:2, identifier: 'stud', title: 'Student', title_en: 'Student'});
		customerTypes.pushObject({id:3, identifier: 'sahl', title: 'Sahlgrenska', title_en: 'Sahlgrenska'});
		customerTypes.pushObject({id:4, identifier: 'priv', title: 'Privatperson', title_en: 'Private person'});
		customerTypes.pushObject({id:5, identifier: 'ftag', title: 'Företag', title_en: 'Company'});
		customerTypes.pushObject({id:6, identifier: 'ovri', title: 'Övriga', title_en: 'Others'});
		customerTypes.pushObject({id:7, identifier: 'dist', title: 'Distansstudent', title_en: 'Distance student'});
		controller.set("customerTypes", customerTypes);
		controller.set("selectedCustomerType", null);

		var deliveryMethods = [];
		deliveryMethods.pushObject({id:1, identifier: 'pickup', title_special: "Hämtas", title: 'Hämta', title_en: 'Pickup'});
		deliveryMethods.pushObject({id:2, identifier: 'send', title_special: "Skickas", title: 'Skicka', title_en: 'Send'});
		controller.set("deliveryMethods", deliveryMethods);
		controller.set("selectedDeliveryMethod", null);	

	},

	actions: {
		resetForm: function() {
			this.controllerFor("application").resetAllData();
		}
	}


});
