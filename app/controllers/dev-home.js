import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DevHomeController extends Controller {
  @service router;
  @service session;

  @action
  async logout() {
    await this.session.logout();
    this.router.transitionTo('login');
  }

}
