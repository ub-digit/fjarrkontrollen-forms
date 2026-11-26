import Component from '@ember/component';
import { inject as injectService } from '@ember/service';
import { observer } from '@ember/object';
import ENV from 'frontend/config/environment';

export default Component.extend({
  tagName: 'div',
  classNames: ['alert-banner-container'],
  ajax: injectService(),
  i18n: injectService(),

  didInsertElement() {
    this._super(...arguments);
    this.fetchAlertMessage();
  },

  localeChanged: observer('i18n.locale', function() {
    this.fetchAlertMessage();
  }),

  fetchAlertMessage() {
    const baseUrl = ENV.APP.serviceUrl || '/api';
    const alertEndpoint = `${baseUrl}/alert`;

    this.get('ajax').request(alertEndpoint, {
      type: 'GET',
      dataType: 'json'
    }).then((response) => {
      if (response.message) {
        const locale = this.get('i18n.locale');
        let alertText = null;

        try {
          const messageObj = typeof response.message === 'string' 
            ? JSON.parse(response.message) 
            : response.message;

          alertText = messageObj[locale] || messageObj.en;
        } catch (e) {
          // If not JSON, treat as plain text
          alertText = response.message;
        }

        this.set('alertMessage', alertText);
      } else {
        this.set('alertMessage', null);
      }
    }).catch(() => {
      // Silently fail if alert endpoint is not reachable
      this.set('alertMessage', null);
    });
  }
});
