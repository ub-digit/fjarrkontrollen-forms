import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
		var orderTypes = [];
		orderTypes.pushObject({id:1, identifier: 'loan', title: 'Lån', title_en: 'Loan'});
		orderTypes.pushObject({id:2, identifier: 'article-copy', title: 'Artikelkopia', title_en: 'Photocopies'});
		orderTypes.pushObject({id:3, identifier: 'book-chapter-copy', title: 'Kopia av bokkapitel', title_en: 'Book chapter'});
		orderTypes.pushObject({id:4, identifier: 'scores', title: 'Musiktryck', title_en: 'scores'});
		orderTypes.pushObject({id:5, identifier: 'micro-film', title: 'Lån mikrofilm', title_en: 'Loan micro-film'});
		controller.set("orderTypes", orderTypes);
		controller.set("selectedOrdertype", null);
	},
	actions: {
		resetForm: function() {
			this.controllerFor("application").resetAllData();
		}
	}


});
