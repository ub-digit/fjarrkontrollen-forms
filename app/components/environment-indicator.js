import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({

  tagName: '',

  componentVisible: Ember.computed('ENV.environment', function() {

    return ((ENV.environment !== 'production') && (ENV.environment !== 'development'));

  }),

  environmentNameString: Ember.computed('ENV.environment', function() {

    return ENV.environment;

  })


});
