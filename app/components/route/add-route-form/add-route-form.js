import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { CITY_ENDPOINTS, ROUTE_ENDPOINTS } from '../../../services/api-endpoints';

export default class AddRouteFormComponent extends Component {
  @service apiGet;
  @tracked allCities = null;
  @service apiPost;
  @tracked source = '';
  @tracked destination = '';
  @tracked distance;
  @service route;
  @tracked timeTravel;
  @action handleInput(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  @action
  async addNewRoute() {
    try {
      const data = {
        source: this.source,
        destination: this.destination,
        distanceKm: this.distance,
        estimatedTime: this.timeTravel,
      };

      const response = await this.apiPost.post(ROUTE_ENDPOINTS.addRoute, data);
      let result = await response.text();
      alert(result);
      if (!response.ok) {
        throw response;
      }
      this.route.fetchRoutes();
    } catch (error) {
      console.error('error adding city: ', error);
    }
  }

  constructor() {
    super(...arguments);
    this.loadCities();
  }

  async loadCities() {
    try {

      this.allCities = await this.apiGet.get(CITY_ENDPOINTS.getAllCities);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
