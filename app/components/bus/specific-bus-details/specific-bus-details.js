import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { BOOKING_ENDPOINTS } from '../../../services/api-endpoints';

export default class SpecificBusDetails extends Component {
  @service bookingData;
  @service session;
  @service apiPost;
  @service schedule;
  @service router;

  @action
  handleField(field, event) {
    this.bookingData[field] = event.target.value;
  }

  @action handleNameAge(field, scheduledSeatId, event) {
    this.bookingData.passengerDetails.forEach(function (passenger, ind) {
      if (passenger.scheduledSeatId === scheduledSeatId) {
        passenger[field] = event.target.value;
      }
    });
  }

  checkFilledPassengerDetails() {
    return this.bookingData.passengerDetails.every(function (passenger) {
      return passenger.passengerName.length > 0 && passenger.passengerAge > 0;
    });
  }

  @action
  async handlePayment() {
    if (this.bookingData.passengerDetails.length == 0) {
      alert('Please select a seat to proceed.');
      return;
    }

    if (
      this.bookingData.selectedBoardingId === null ||
      this.bookingData.selectedDroppingId === null ||
      this.checkFilledPassengerDetails() === false
    ) {
      alert('Fill in all the details / Invalid input');
      return;
    }

    const bookSeatData = {
      userId: this.session.user.userId,
      scheduleId: this.args.model.schedule.scheduleId,
      payableAmount: this.bookingData.payAmount,
      boardingPointId: this.bookingData.selectedBoardingId,
      droppingPointId: this.bookingData.selectedDroppingId,
      passengerDetails: this.bookingData.passengerDetails,
    };

    const response = await this.apiPost.post(
      BOOKING_ENDPOINTS.bookSeats,
      bookSeatData,
    );
    let result = await response.text();
    if (response.ok) {
      alert('Payment successful. Seat booked');

      this.bookingData.passengerDetails = [];
      this.bookingData.selectedBoardingId = null;
      this.bookingData.selectedDroppingId = null;
    } else {
      alert('Payment Failed. Seat not booked');
    }
    this.router.transitionTo('home');
  }
}
