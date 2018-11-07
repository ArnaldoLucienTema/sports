import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "../_services/notifications.service";
import { NotificationViewModel } from "../_models/notification_viewmodel";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  show_notifications: boolean;

  notifications_list: NotificationViewModel[];

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.show_notifications = false;
    this.notifications_list = [];

    this.notificationsService.notifications.subscribe(notification => {
      this.notifications_list.push(notification);
    })
  }

}
