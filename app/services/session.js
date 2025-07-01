import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'bus-booking-client/config/environment'
import { USER_ENDPOINTS } from './api-endpoints';



export default class SessionService extends Service {
  @service router
  @tracked user = null;
  @tracked roles = [];
  @service apiGet;
  async getRoles() {
    const result = await this.apiGet.get(USER_ENDPOINTS.getRoles);
    this.roles = result;
  }




  async checkStatus(currentPage) {
  
    await fetch(config.apiBaseUrl + '/user/' + currentPage, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    }).then (response => {

    if (response.ok) {
      return response.json();
    } else {
      
      this.router.transitionTo("login")
      return Promise.reject("Unauthorized");
    }
    }).then(data => {
      this.user = data;
    }) .catch(err => {
      console.error(err);
    })

  }

  async logout() {
    await fetch(config.apiBaseUrl + USER_ENDPOINTS.logout, {
      credentials: 'include'
    });
    this.user = null;
  }

}
