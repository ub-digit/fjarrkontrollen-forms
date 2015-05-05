import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return params;
	},
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
		orderTypes.pushObject({id:2, identifier: 'book', title: 'Bok', title_en: 'Loan'});
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


   // queryParams: ['rft_genre', 'isbn_issn', 'book_title', 'journal_title', 'title_of_article', 'year', 'volume', 'issue', 'pages', 'edition', 'author'],
        console.log(model.rft_genre);

        if (model.rft_genre === 'article') {
        	console.log("asd");
        	controller.set("selectedOrderType", controller.get("orderTypes").findBy('identifier', 'article'));
			controller.set("orderDetails.article.issn", model.isbn_issn);
			controller.set("orderDetails.article.journalTitle", model.journal_title);
			controller.set("orderDetails.article.articleTitle", model.title_of_article);
			controller.set("orderDetails.article.publicationYear", model.year);
			controller.set("orderDetails.article.issue", model.issue);
			controller.set("orderDetails.article.volume", model.volume);
			controller.set("orderDetails.article.pages", model.pages);
			controller.set("orderDetails.article.authors", model.author);
			controller.set("orderPath", "SFX");


        }
        else if (model.rft_genre === 'book') {
            controller.set("selectedOrderType", controller.get("orderTypes").findBy('identifier', 'book'));
			controller.set("orderDetails.book.isbn", model.isbn_issn);
			controller.set("orderDetails.book.bookTitle", model.book_title);
			controller.set("orderDetails.book.publicationYear", model.year);
			controller.set("orderDetails.book.authors", model.author);
			controller.set("orderPath", "SFX");
		}
	},

	actions: {
		resetForm: function() {
			this.controllerFor("application").resetAllData();
		}
	}


});
