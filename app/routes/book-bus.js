import Route from '@ember/routing/route';
import Service, { service } from '@ember/service';

export default class BookBusRoute extends Route {
    @service schedule;
    @service session;
    @service city;
    @service bookingData;
    async model(params) {
        this.bookingData.selectedSeats = [];
        this.bookingData.payAmount = 0;

        await this.session.checkStatus('book-bus');
        await this.schedule.detailsOfASchedule(params.scheduleId);
        await this.city.getLocationPoints(params.scheduleId, 1);
        await this.city.getLocationPoints(params.scheduleId, 0);

        return {
            schedule: this.schedule.scheduleDetails,
            boardingPoints: this.bookingData.boardingPoints,
            droppingPoints: this.bookingData.droppingPoints,
        };
    }
}
