import EmberRouter from '@ember/routing/router';
import config from 'bus-booking-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('signup');
  this.route('home');
  this.route('admin-home');
  this.route('dev-home');
  this.route('book-bus', { path: '/book/:scheduleId' });
  this.route('bookings');
});
