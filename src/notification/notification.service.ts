import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DatabaseService, MessagingService } from 'nestjs-firebase-admin';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
    private readonly messagingService: MessagingService,
    private readonly databaseService: DatabaseService,
  ) {}

  async publishNotification(topic: string, data: any): Promise<void> {
    try {
      await firstValueFrom(this.mqttClient.emit(topic, data));
    } catch (error) {
      console.error('Error publishing notification:', error);
      throw new HttpException('Error publishing notification', 500);
    }
  }

  async sendNotification(payload: any): Promise<void> {
    const data = payload?.data;
     if (!data) {
      console.error('No data provided for notification');
      throw new HttpException('No data provided for notification', 400);
    }
    if (!data.id) {
      console.error('No ID provided for notification');
      throw new HttpException('No ID provided for notification', 400);
    }
    const token = data?.fcm_token;
    if (!token) {
      console.error('No token provided for notification');
      throw new HttpException('No token provided for notification', 400);
    }
    const ms = 10_000; // 10 seconds

    setTimeout(async () => {
      try {
        await this.messagingService.sendToDevice(token, {
          token,
          notification: {
            title: 'New Data Created',
            body: `New data created with ID: ${data.id}`,
          },
          data: {
            type: 'DATA_CREATED',
            id: data.id,
            timestamp: data.timestamp,
          },
        });

        this.databaseService.update(`path/to/data/${data.id}`, {
          welcomeMessageSent: true,
          updatedAt: new Date().toISOString(),
        });
        console.log('Notification sent successfully');
      } catch (error) {
        console.error('Error sending notification:', error);
        throw new HttpException('Error sending notification', 500);
      }
    }, ms);
  }
}
