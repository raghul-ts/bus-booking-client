import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RouteFormComponent extends Component {
    @tracked showRouteList = false;
    @tracked showRouteForm = false;

    @action
    toggleRouteList() {
        this.showRouteList = !this.showRouteList;
    }
    @action
    toggleRouteForm() {
        this.showRouteForm = !this.showRouteForm;
    }

    

}