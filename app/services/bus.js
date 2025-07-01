import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { BUS_ENDPOINTS } from './api-endpoints';



export default class BusService extends Service {
  @service router
  @tracked buses = [];
  @service apiGet;
  async fetchBuses() {
    try {
      const response = await this.apiGet.get(BUS_ENDPOINTS.getAllBuses);
      this.buses = response;
      console.log(this.buses);
      
    } catch (error) {
      console.error('Failed to fetch buses', error);
    }
  }
}

