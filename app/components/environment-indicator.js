import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({

  tagName: '',

  componentVisible: Ember.computed('ENV.environment', function() {

    console.log((ENV.environment !== 'production'));

    return (ENV.environment !== 'production');

  }),

  environmentNameString: Ember.computed('ENV.environment', function() {

    var name = null;

    switch (ENV.environment) {
      case 'development':
        //name = 
        break;
      case 'test':

        break;
      case 'lab':

        break;
      case 'staging':

        break;
      case 'production':

        break;
      default:

    }

    return ENV.environment;

  })


});
