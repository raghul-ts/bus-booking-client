import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ScheduleFormComponent extends Component {
    @tracked showScheduleList = false;
    @tracked showScheduleForm = false;

    @action
    toggleScheduleList() {
        this.showScheduleList = !this.showScheduleList;
    }
    @action
    toggleScheduleForm() {
        this.showScheduleForm = !this.showScheduleForm;
    }

    

}