import Service from '@ember/service';
import config from 'bus-booking-client/config/environment';

export default class ApiGetService extends Service {
  async get(endpoint) {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to Get data');
    }
    let result = await response.json();
    return result;
  }
}