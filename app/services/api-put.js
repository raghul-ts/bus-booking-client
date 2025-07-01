import Service from '@ember/service';
import config from 'bus-booking-client/config/environment';

export default class ApiPutService extends Service {
    
  async put(endpoint, data) {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });


    return response;
  }
}
