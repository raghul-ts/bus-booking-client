import Component from '@glimmer/component';
import Service, { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SeatLayoutComponent extends Component {
  @service bookingData;
  @service session;
  @service apiPost;
  @service router;
  @service schedule;
  @tracked upperSeats = [];
  @tracked lowerSeats = [];
  @tracked upper = false;
  @tracked lower = false;
  totalColumns = this.schedule.scheduleDetails.totalColumns;
  @tracked seatLayout = this.schedule.scheduleDetails.seatLayout;

  constructor() {
    super(...arguments);
    this.loadSeats();
  }

  loadSeats() {
    console.log(this.seatLayout);
    for (let i = 1; i <= this.totalColumns; i++) {
      const lowerColSeats = { colNumber: i, col_seats: [] };
      const upperColSeats = { colNumber: i, col_seats: [] };

      this.seatLayout.forEach((seat, index) => {
        console.log(seat);
        if (seat.pos === 'UPPER' && seat.columnNumber === i) {
          upperColSeats.col_seats.push(seat);
          this.upper = true;
        }
        if (seat.pos === 'LOWER' && seat.columnNumber === i) {
          lowerColSeats.col_seats.push(seat);
          this.lower = true;
        }
      });
      this.upperSeats.push(upperColSeats);
      this.lowerSeats.push(lowerColSeats);
    }

    console.log(this.totalColumns);
    console.log(this.upperSeats);
    console.log(this.lowerSeats);
  }

  @action
  toggleSeat(seat) {
    if (seat.status === 't') return;
    const passengerData = {
      scheduledSeatId: seat.scheduledSeatId,
      passengerName: '',
      passengerAge: 0,
    };
    if (this.bookingData.selectedSeats.includes(seat)) {
      this.bookingData.selectedSeats = this.bookingData.selectedSeats.filter(
        (id) => id !== seat,
      );

      this.bookingData.passengerDetails =
        this.bookingData.passengerDetails.filter(
          (p) => p.scheduledSeatId !== seat.scheduledSeatId,
        );

      this.bookingData.payAmount -= this.schedule.scheduleDetails.price;
    } else {
      this.bookingData.selectedSeats = [
        ...this.bookingData.selectedSeats,
        seat,
      ];

      this.bookingData.passengerDetails = [
        ...this.bookingData.passengerDetails,
        passengerData,
      ];

      this.bookingData.payAmount += this.schedule.scheduleDetails.price;
    }
    console.log(this.bookingData.selectedSeats);
  }
  @action
  isSeatSelected(seat) {
    return this.bookingData.selectedSeats.includes(seat);
  }
}
