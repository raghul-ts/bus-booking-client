import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { BUS_ENDPOINTS } from '../../../services/api-endpoints';

export default class AddBusFormComponent extends Component {
  @tracked busNo = '';
  @tracked busType = '';
  @tracked totalSeats = null;
  @tracked operatorName = '';
  @service apiPost;
  @service apiGet;
  @service bus;
  @tracked selectedColumns = 0;
  @tracked seatLayout = [];

  @action
  addBusNo(event) {
    this.busNo = event.target.value;
  }

  @action
  changeBusType(event) {
    this.busType = event.target.value;
  }

  @action
  addColumns(event) {
    this.selectedColumns = event.target.value;
    this.seatLayout = [];
    if (this.selectedColumns === '3') {

      for (let i = 1; i <= 3; i++) {
        const seatUpper = { pos: 'UPPER', colNumber: i, rows: {} };
        const seatLower = { pos: 'LOWER', colNumber: i, rows: {} };
        this.seatLayout.push(seatUpper);
        this.seatLayout.push(seatLower);
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        const seatLower = { pos: 'LOWER', colNumber: i, rows: {} };
        this.seatLayout.push(seatLower);
      }
    }
    // console.log(this.seatLayout);
  }

  @action
  handleColInput(col, pos, event) {

    this.seatLayout = this.seatLayout.map(seat => {
      // Update the correct seat
      if (seat.pos === pos && seat.colNumber === parseInt(col)) {
        seat.rows = [];  // Reset rows for the selected column
        let selectedRows = event.target.value;
        const new_rows = [];
        for (let i = 1; i <= parseInt(selectedRows); i++) {
          const row_seat = { seat_type: null, rowNumber: i };
          new_rows.push(row_seat);
        }
        return {...seat, rows: new_rows};
      }
      return seat;  // Return the updated seat object
    });


    // this.seatLayout.forEach(function(seat, index) {
    //   if (seat.pos === pos && seat.colNumber === parseInt(col)) {
    //     seat.rows = [];
    //     let selectedRows = event.target.value;
    //     console.log(selectedRows);
    //     for (let i = 1; i <= parseInt(selectedRows); i++) {
    //       const row_seat = {
    //         seat_type: null,
    //         rowNumber: i
    //       };
    //       seat.rows.push(row_seat);
    //     }
    //   }
    // })
  
    console.log(this.seatLayout);
  }





  @action
  addOperatorName(event) {
    this.operatorName = event.target.value;
  }


  // @action
  // async addNewBus() {
  //   try {
  //     const data = {
  //       vehicleNumber: this.busNo,
  //       busType: this.busType,
  //       totalSeats: this.totalSeats,
  //       operatorName: this.operatorName,
  //     };
  //     const response = await this.apiPost.post(BUS_ENDPOINTS.addBus, data);
  //     let result = await response.text();
  //     alert(result);

  //     if (!response.ok) {
  //       throw response;
  //     }
  //     this.bus.fetchBuses();
  //   } catch (error) {
  //     console.error('Error adding bus: ', error);
  //   }
  // }
}
