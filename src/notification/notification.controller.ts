import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('data-created')
  async handleDataCreated(data: any) {
    console.log('Received notification for new data:', data);
    // Here you can add your notification logic
    // For example, sending emails, push notifications, etc.
  }
}
