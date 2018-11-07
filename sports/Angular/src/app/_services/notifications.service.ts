import { Injectable } from '@angular/core';
import { SocketIOService } from "./socket_io.service";
import { Observable, Subject } from 'rxjs/Rx';
import { NotificationViewModel } from "../_models/notification_viewmodel";

@Injectable()
export class NotificationsService {

  notifications: Subject<NotificationViewModel>;

  // Our constructor calls our wsService connect method
  constructor(private socketService: SocketIOService) {
    this.notifications = <Subject<NotificationViewModel>>socketService
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  // Our simplified interface for sending
  // notifications back to our socket.io server
  sendMsg(msg) {
    this.notifications.next(msg);
  }

}
