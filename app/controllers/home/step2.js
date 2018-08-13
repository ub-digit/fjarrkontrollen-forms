import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service } from '@ember/service';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  
});
