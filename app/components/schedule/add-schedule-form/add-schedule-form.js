import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { BUS_ENDPOINTS, SCHEDULE_ENDPOINTS, ROUTE_ENDPOINTS } from '../../../services/api-endpoints';
export default class AddScheduleFormComponent extends Component {
  @tracked routeId = null;
  @tracked busId = null;
  @tracked deptime = '';
  @tracked arrivaltime = '';
  @tracked price = null;
  @tracked journeydate = '';

  @tracked routes = [];
  @tracked buses = [];

  @service schedule;
  @service apiPost;
  @action
  handleInput(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  @action
  updateField(field, event) {
    this[field] = event.target.value;
    
  }

  @service apiGet;

  constructor() {
    super(...arguments);
    this.loadRoutes();
    this.loadBuses();
  }
  async loadRoutes() {
    try {
      const response = await this.apiGet.get(ROUTE_ENDPOINTS.getAllRoutes);
      this.routes = response;
    } catch (error) {
      console.error('Failed to fetch routes', error);
    }
    
  }

  async loadBuses() {
    try {
      const response = await this.apiGet.get(BUS_ENDPOINTS.getAllBuses);
      this.buses = response;
    } catch (error) {
      console.error('Failed to fetch routes', error);
    }
    
  }

  @action
  async addNewSchedule() {
    const data = {
      routeId: this.routeId,
      busId: this.busId,
      departureTime: this.deptime,
      arrivalTime: this.arrivaltime,
      price: this.price,
      journeyDate: this.journeydate,
    };
  
    
    try {
      const response = await this.apiPost.post(
        SCHEDULE_ENDPOINTS.addSchedule,
        data
      );
      let resData = await response.text();
      alert(resData)
      if (!response.ok) {
        throw response;
      }
      this.schedule.fetchSchedules();

    } catch (error) {
      throw error;
    }
    
  }
}
