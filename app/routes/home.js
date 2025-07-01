import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { CITY_ENDPOINTS } from '../services/api-endpoints';

export default class HomeRoute extends Route {
    @service session;
    @service apiGet;
    async model() {
      await this.session.checkStatus("home");
      const cityArray = await this.apiGet.get(CITY_ENDPOINTS.getAllCities);
      return {
        user: this.session.user,
        cityData: cityArray
      }
    }
}