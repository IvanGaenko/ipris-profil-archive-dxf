// Imports
import { makeObservable, observable, action } from 'mobx';

class NotificationStore {
  notification = {
    open: false,
    status: '',
    value: '',
  };

  constructor() {
    makeObservable(this, {
      notification: observable,
      showNotification: action,
      closeNotification: action,
    });
  }

  showNotification = (value) => {
    this.notification.open = true;
    this.notification.status = value.status;
    this.notification.value = value.value;
  };

  closeNotification = () => {
    const closedNotification = {
      open: false,
      status: '',
      value: '',
    };
    this.notification = closedNotification;
  };
}

export default NotificationStore;
