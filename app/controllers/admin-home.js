import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AdminHomeController extends Controller {
  @service router;
  @service session;
  @tracked activePanel = '';

  @action
  setActivePanel(panelName) {
    this.activePanel = panelName;
    
  }

  @action
  async logout() {
    await this.session.logout();
    this.router.transitionTo('login');
  }

}
