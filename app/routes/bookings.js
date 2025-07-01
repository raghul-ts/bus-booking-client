import Route from '@ember/routing/route';
import Service, { service } from '@ember/service';


export default class BookingsRoute extends Route {
  @service session;
  @service bookings;
  async model() {
    await this.session.checkStatus('bookings');
    await this.bookings.fetchBookings();
  }
}
