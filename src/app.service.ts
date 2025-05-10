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
  ) { }

  async getData(device_id?: string): Promise<any[]> {
    const data = await this.databaseService.get('path/to/data');
    if (!data) {
      return [];
    }
    const dataArray = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...(typeof value === 'object' && value !== null ? value : {}),
    }));

    let filtered = dataArray;
    if (device_id) {
      filtered = filtered.filter(item => item.device_id === device_id);
    }

    return filtered.map((item) => {
      const { device_id, fcm_token, ...rest } = item;
      return rest;
    });
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
    const { device_id, fcm_token, ...rest } = setDataDto;
    return { ...rest, id } as SetDataDto & { id: string };
  }

  async updateData(
    id: string,
    updateDataDto: UpdateDataDto,
  ): Promise<UpdateDataDto> {
    await this.databaseService.update(`path/to/data/${id}`, {
      ...updateDataDto,
      updatedAt: new Date().toISOString(),
    });

    const { device_id, fcm_token, ...rest } = updateDataDto;
    return rest;
  }

  async deleteData(id: string): Promise<void> {
    await this.databaseService.remove(`path/to/data/${id}`);
  }
}
