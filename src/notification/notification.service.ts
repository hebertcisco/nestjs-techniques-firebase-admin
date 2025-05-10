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
}
