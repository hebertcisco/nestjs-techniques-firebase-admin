import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'nestjs-firebase-admin';
import { randomUUID } from 'node:crypto';
import { NotificationService } from './notification/notification.service';
import { UpdateDataDto } from './dtos/UpdateDataDto';
import { SetDataDto } from './dtos/SetDataDto';

@Injectable()
export class AppService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly notificationService: NotificationService,
  ) {}

  async getData(): Promise<any> {
    const data = await this.databaseService.get('path/to/data');
    if (!data) {
      throw new Error('No data found');
    }
    const dataArray = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...(typeof value === 'object' && value !== null ? value : {}),
    }));
    return dataArray;
  }

  async setData(setDataDto: SetDataDto): Promise<SetDataDto & { id: string }> {
    const id = randomUUID();
    const timestamp = new Date().toISOString();
    await this.databaseService.set(`path/to/data/${id}`, {
      ...setDataDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      welcomeMessageSent: false,
    });

    // Send welcome message
    await this.notificationService.publishNotification('data-created', {
      type: 'DATA_CREATED',
      data: {
        ...setDataDto,
        id,
        timestamp: timestamp,
      },
      id,
      timestamp: timestamp,
    });

    return { ...setDataDto, id };
  }

  async updateData(
    id: string,
    updateDataDto: UpdateDataDto,
  ): Promise<UpdateDataDto> {
    await this.databaseService.update(`path/to/data/${id}`, {
      ...updateDataDto,
      updatedAt: new Date().toISOString(),
    });
    return updateDataDto;
  }

  async deleteData(id: string): Promise<void> {
    await this.databaseService.remove(`path/to/data/${id}`);
  }
}
