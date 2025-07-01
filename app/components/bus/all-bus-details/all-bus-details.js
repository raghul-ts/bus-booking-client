import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { BUS_ENDPOINTS } from '../../../services/api-endpoints';


export default class AddBusFormComponent extends Component {
  @service apiGet;
  @service apiDelete;
  @service apiPut;
  @service bus
  @tracked editingBusId = null;

  @tracked editBusNo = '';
  @tracked editBusType = '';
  @tracked editOperatorName = '';
  @tracked editTotalSeats = 0;

  constructor() {
    super(...arguments);
    this.bus.fetchBuses();
  }
  
  @action editBus(bus) {
    this.editingBusId = bus.busId;
    this.editBusNo = bus.busNo;
    this.editBusType = bus.busType;
    this.editOperatorName = bus.operatorName;
    this.editTotalSeats = bus.totalSeats;
  }

  @action cancelEdit() {
    this.editingBusId = null;
  }

  @action updateField(field, event) {
    this[field] = event.target.value;
  }

  @action async saveBus(busId) {
    const data = {
      busId,
      vehicleNumber: this.editBusNo,
      busType: this.editBusType,
      totalSeats: this.editTotalSeats,
      operatorName: this.editOperatorName
    }
    try {
      const response = await this.apiPut.put(BUS_ENDPOINTS.updateBus, data);
      let result = await response.text();
      if (response.ok) {
        alert(result);
        this.editingBusId = null;
        this.bus.fetchBuses();
      } else {
        alert(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  @action async deleteBus(busId) {
    try {
      const response = await this.apiDelete.delete(BUS_ENDPOINTS.deleteBus + "/" + busId);
      if (!response.ok) {
        let result = await response.text();
        alert(result);
        return;
      }
      this.bus.buses = this.bus.buses.filter(b => b.busId !== busId);
      
    } catch (error) {
      console.error(error);
    }

  }
}
