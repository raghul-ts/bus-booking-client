import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LoginRoute extends Route {
    @service session;
    @service router;
    async model() {
        const homeResult = await this.session.checkStatus("home");
        const adminResult = await this.session.checkStatus("admin-home");
        if (this.session.user === null) return;
        const roleId = this.session.user.roleId;
        if (roleId === 1) {
            this.router.transitionTo("admin-home");
        } else if (roleId === 3) {
            this.router.transitionTo("home");
        }
    }
}
