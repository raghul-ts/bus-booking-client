import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminHomeRoute extends Route {
    @service session;
    @service router;
    
    async model() {
        await this.session.checkStatus("admin-home");
        await this.session.getRoles();
        return this.session.user;
    }
}
