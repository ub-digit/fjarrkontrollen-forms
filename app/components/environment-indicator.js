import ENV from '../config/environment';
import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({

  tagName: '',

  componentVisible: computed('ENV.environment', function() {

    return ((ENV.environment !== 'production') && (ENV.environment !== 'development'));

  }),

  environmentNameString: computed('ENV.environment', function() {

    return ENV.environment;

  })


});
