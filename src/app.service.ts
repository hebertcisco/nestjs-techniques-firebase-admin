import { Injectable } from '@nestjs/common';
import { configService } from 'nest-shared';

import { AdminService } from 'nestjs-firebase-admin';
import { messaging } from 'firebase-admin';

import MessagingDevicesResponse = messaging.MessagingDevicesResponse;

/**
 * TODO: This is just an example of how to use the adminService.
 */
@Injectable()
export class AppService {
  constructor(private adminService: AdminService) { }

  public async getHello(message: string) {
    const admin = this.adminService.admin();
    /**
     * TODO: Is this the best way to get the token? No, you should find a way to get it.
     * This is just an example of how to use the configService.
     */
    const registrationToken = configService.getValue<string>('FCM_TOKEN');

    console.log("message", message);

    const payload = {
      notification: {
        title: 'Hello',
        body: message,
      },
    };

    const response: MessagingDevicesResponse = await admin.messaging().sendToDevice(registrationToken, payload);
    console.log('Successfully sent message:', response);
    return { message: message };
  }
}
