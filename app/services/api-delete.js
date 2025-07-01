import Service from '@ember/service';
import config from 'bus-booking-client/config/environment';

export default class ApiGetService extends Service {
    async delete(endpoint) {
        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return response;
    }
}
