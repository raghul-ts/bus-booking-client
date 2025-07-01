import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'bus-booking-client/config/environment';
import { BOOKING_ENDPOINTS } from './api-endpoints';

export default class BookingsService extends Service {
  @service apiGet;
  @service session;
  @tracked bookings = [];
  async fetchBookings() {
    this.bookings = await this.apiGet.get(
      BOOKING_ENDPOINTS.getUserBookings + '/' + this.session.user.userId,
    );
  }
}
