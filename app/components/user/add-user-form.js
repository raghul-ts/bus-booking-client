import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { USER_ENDPOINTS } from '../../services/api-endpoints';

export default class AddUserFormComponent extends Component {
  @tracked username = '';
  @tracked password = '';
  @service apiPost;
  @service session;
  @tracked selectedRole = '';

  @action
  changeRole (event) {
    this.selectedRole = event.target.value;
    
  }

  get disableSubmit() {
    return !this.username.length || !this.password.length || !this.selectedRole.length;
  }

  @action async onSubmit(event) {
    event.preventDefault();
    if (this.username.length === 0 || this.password.length === 0 || this.selectedRole.length === 0) {
      alert("Fill in the details");
      return;
    }
    const data = {
      username: this.username,
      password: this.password,
      role: this.selectedRole,
    };

    try {
      const response = await this.apiPost.post(USER_ENDPOINTS.addUser, data);
      if (!response.ok) {
        if (response.status === 400) {
          alert("Bad Request");
          throw response;
        }
        alert("Username already exists");
        throw response;
      }
      alert(this.selectedRole + ' added Successfully');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
