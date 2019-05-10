import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';
import { inject as injectService } from '@ember/service';

export default Controller.extend({
  applicationController: injectController('application'),
  i18n: injectService(),
});
