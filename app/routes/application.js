import Route from '@ember/routing/route';
import Service, { service } from '@ember/service';


export default class ApplicationRoute extends Route {
    @service router;
    beforeModel(transition) {
        if (transition.to.name === 'index') {
            this.router.transitionTo('login');
        }
    }
}