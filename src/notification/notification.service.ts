import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  async publishNotification(topic: string, data: any): Promise<void> {
    await firstValueFrom(this.mqttClient.emit(topic, data));
  }

  async sendNotification(data: any): Promise<void> {
    const ms = 10_000; // 10 seconds
    console.log('Data created event received now:', new Date());

    setTimeout(() => {
      console.log('Data created event received after 10 seconds:', new Date());
      console.log('Received notification for new data:', data);
      // Here you can add your notification logic
      // For example, sending emails, push notifications, etc.
    }, ms);
  }
}
