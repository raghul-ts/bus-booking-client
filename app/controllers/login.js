import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import config from 'bus-booking-client/config/environment'
import { USER_ENDPOINTS } from '../services/api-endpoints';


export default class LoginController extends Controller {
    @service session

    @service router
  username = '';
  password = '';
  error = '';

  @action
  updateUsername(event) {
    this.username = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  async login() {
    try {
      await fetch(config.apiBaseUrl + USER_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      }).then (res => {
        if (!res.ok) {
          alert("Username or password is incorrect.")
        } else {
          alert("Login Success!")
          return res.json();
        }
      }).then (data => {
        
        if (data.roleId === 1) {
          this.router.transitionTo('admin-home');
        } else if (data.roleId === 2) {
          this.router.transitionTo('dev-home');
        } else {
          this.router.transitionTo('home');
        }
        
      })
    } catch (e) {
      this.error = 'Login failed';
    }
  }
}
