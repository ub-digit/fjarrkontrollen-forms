import Ember from 'ember';

export default Ember.Route.extend({

	setupController: function(controller, model) {
		var orderTypes = [];
		orderTypes.pushObject({id:1, identifier: 'loan', title: 'Lån'});
		orderTypes.pushObject({id:2, identifier: 'article-copy', title: 'Artikelkopia'});
	/*	orderTypes.pushObject({id:3, identifier: 'book-chapter-copy', title: 'Kopia av bokkapitel', validFor: ['forskare_anstalld','student','sahlgrenska', 'privatperson', 'foretag', 'ovriga', 'distansstudent']});
		orderTypes.pushObject({id:4, identifier: 'scores', title: 'Musiktryck', validFor: ['forskare_anstalld','student', 'distansstudent']});
		orderTypes.pushObject({id:5, identifier: 'micro-film', title: 'Lån mikrofilm', validFor: ['forskare_anstalld','student','sahlgrenska', 'privatperson', 'foretag', 'ovriga', 'distansstudent']});*/
		controller.set("orderTypes", orderTypes);
		controller.set("selectedOrdertype", null);
	}
});
