import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';

export default Controller.extend({
  applicationController: injectController('application'),
});
