import Ember from 'ember';
import ENV from '../config/environment';
import LANG_EN from 'fjarrkontrollen-forms/locales/en';
import LANG_SV from 'fjarrkontrollen-forms/locales/sv';

// Adds support for translatable properties, i.e. placeholderTranslation='key'
Ember.View.reopen(Ember.I18n.TranslateableAttributes);

export default {
  name: 'locale-init',
    initialize: function(container) {
      var rootElement = Ember.$(ENV.APP.rootElement);
      var lang = rootElement.data().lang;

      if (!lang) {
        lang = ENV.APP.defaultLocale;
      }

      // Duplication of locale initialization to make available Ember.I18n functionality (ie placeholderTranslation) in addition to EmberCLI.I18n
      var translation = Ember.$.extend(true, {}, {sv: LANG_SV, en: LANG_EN})[lang];
      Ember.I18n.translations = translation;
      Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;
      Ember.ENV.I18N_COMPILE_WITHOUT_HANDLEBARS = true;
      // -----------------<

      var application = container.lookup('application:main');
      Ember.set(application, 'locale', lang);

    }
};
