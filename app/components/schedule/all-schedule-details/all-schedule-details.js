import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { ROUTE_ENDPOINTS, SCHEDULE_ENDPOINTS } from '../../../services/api-endpoints';

// THIS COMPONENT IS STILL UNDER DEVELOPMENT




export default class AllScheduleDetailsComponent extends Component {
  @service schedule;
  @service bus;
  @service route;
  @tracked currentScheduleId = null;
  @tracked editRouteId = null;
  @tracked editBusId = null;
  @tracked editArrivalTime = '';
  @tracked editDepartureTime = '';
  @tracked editAvailableSeats = null;
  @tracked editJourneyDate = '';
  @tracked editPrice = null;

  @service apiDelete;
  @service apiPut;

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }

  constructor() {
    super(...arguments);
    this.schedule.fetchSchedules();
    this.route.fetchRoutes();
    this.bus.fetchBuses();
  }

  @action
  editSchedule(schedule) {
    this.currentScheduleId = schedule.scheduleId;
    this.editRouteId = schedule.routeId;
    this.editBusId = schedule.busId;
    this.editArrivalTime = schedule.arrivalTime;
    this.editDepartureTime = schedule.departureTime;
    this.editAvailableSeats = schedule.availableSeats;
    this.editPrice = schedule.price;
    this.editJourneyDate = schedule.journeyDate;
  }

  @action
  async deleteSchedule(scheduleId) {
    try {
      const response = await this.apiDelete.delete(
        SCHEDULE_ENDPOINTS.deleteSchedule + '/' + scheduleId,
      );
      let result = await response.text();
      if (!response.ok) {
        alert('Delete unsuccessful');
        throw response;
      }
      this.schedule.schedules = this.schedule.schedules.filter(
        (s) => s.scheduleId !== scheduleId,
      );

      alert(result);
    } catch (error) {
      console.error(error);
    }
  }

  @action
  async saveSchedule(scheduleId) {
    const data = {
        scheduleId,
        routeId: this.editRouteId,
        busId: this.editBusId,
        arrivalTime: this.editArrivalTime,
        departureTime: this.editDepartureTime,
        availableSeats: this.editAvailableSeats,
        price: this.editPrice,
        journeyDate: this.journeyDate
    };
    try {
      const response = await this.apiPut.put(SCHEDULE_ENDPOINTS.updateSchedule, data);
      let result = await response.text();
      this.currentScheduleId = null;
      if (!response.ok) {
        throw response;
      }
      this.route.fetchSchedules();
      alert(result);
    } catch (error) {
      console.error(error);
    }
  }
  @action
  cancelSchedule() {
    this.currentScheduleId = null;
  }
}
