import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { SCHEDULE_ENDPOINTS } from './api-endpoints';

export default class ScheduleService extends Service {
  @tracked schedules = [];
  @service apiGet;
  @tracked scheduleDetails = null;
  async fetchSchedules() {
    try {
      const response = await this.apiGet.get(
        SCHEDULE_ENDPOINTS.getAllSchedules,
      );
      this.schedules = response;
    } catch (error) {
      console.error('Failed to fetch schedules', error);
    }
  }

  async detailsOfASchedule(scheduleId) {
    try {
      const url = SCHEDULE_ENDPOINTS.getScheduleDetails.replace(
        ':id',
        scheduleId,
      );

      const result = await this.apiGet.get(url);
      this.scheduleDetails = result;

    } catch (error) {
      console.error(error);
    }
  }
}
