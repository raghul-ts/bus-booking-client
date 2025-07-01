import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BookingDataService extends Service {
    @tracked selectedSeats = [];
    @tracked boardingPoints = [];
    @tracked droppingPoints = [];
    @tracked selectedSchedule = null;
    @tracked payAmount = 0;
    @tracked selectedBoardingId = null;
    @tracked selectedDroppingId = null;
    @tracked passengerDetails = [];



}

