import Route from '@ember/routing/route';
import Service, {service} from '@ember/service';


export default class DevHomeRoute extends Route {
    @service session
    async model() {
        await this.session.checkStatus("dev-home");
        return this.session.user;
    }
}
