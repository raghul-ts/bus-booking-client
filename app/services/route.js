import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ROUTE_ENDPOINTS } from './api-endpoints';



export default class BusService extends Service {
  @tracked routes = [];
  @service apiGet;

  async fetchRoutes() {
    try {
      const response = await this.apiGet.get(ROUTE_ENDPOINTS.getAllRoutes);
      this.routes = response;
      
    } catch (error) {
      console.error('Failed to fetch routes', error);
    }
  }
}
