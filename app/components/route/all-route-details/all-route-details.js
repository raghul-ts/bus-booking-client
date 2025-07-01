import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { ROUTE_ENDPOINTS } from '../../../services/api-endpoints';

export default class AllRouteDetailsComponent extends Component {
  @service route;
  @tracked currentRouteId = null;
  @service city;
  @tracked editDistance = '';
  @tracked editTime = '';
  @tracked editSource = '';
  @tracked editDestination = '';
  @service apiDelete;
  @service apiPut;

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }

  constructor() {
    super(...arguments);
    this.route.fetchRoutes();
    this.city.fetchCities();
  }

  @action
  editRoute(route) {
    this.currentRouteId = route.routeId;
    this.editDistance = route.distanceKm;
    this.editTime = route.estimatedTime;
    this.editSource = route.source;
    this.editDestination = route.destination;
  }

  @action
  async deleteRoute(routeId) {
    try {
      const response = await this.apiDelete.delete(
        ROUTE_ENDPOINTS.deleteRoute + '/' + routeId,
      );
      let result = await response.text();
      if (!response.ok) {
        alert('Delete unsuccessful');
        throw response;
      }
      this.route.routes = this.route.routes.filter((r) => r.routeId !== routeId);

      alert(result);
    } catch (error) {
      console.error(error);
    }
  }

  @action
  async saveRoute(routeId) {
    const data = {
        routeId,
        source: this.editSource,
        destination: this.editDestination,
        distanceKm: this.editDistance,
        estimatedTime: this.editTime
    }
    try {
        const response = await this.apiPut.put(ROUTE_ENDPOINTS.updateRoute, data);
        let result = await response.text();
        this.currentRouteId = null;
        if (!response.ok) {
            throw response;
        }
        this.route.fetchRoutes();
        alert(result);

    } catch (error) {
        console.error(error);
    }
  }
  @action
  cancelRoute() {
    this.currentRouteId = null;
  }
}
