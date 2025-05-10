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
    return 'This action returns all data';
  }

  async setData(setDataDto: SetDataDto): Promise<SetDataDto & { id: string }> {
    const id = randomUUID();
    await this.databaseService.set(`path/to/data/${id}`, setDataDto);

    // Publish notification when data is created
    await this.notificationService.publishNotification('data-created', {
      type: 'DATA_CREATED',
      data: setDataDto,
      id,
      timestamp: new Date().toISOString(),
    });

    return { ...setDataDto, id };
  }

  async updateData(
    id: string,
    updateDataDto: UpdateDataDto,
  ): Promise<UpdateDataDto> {
    await this.databaseService.update(`path/to/data/${id}`, updateDataDto);
    return updateDataDto;
  }

  async deleteData(id: string): Promise<void> {
    await this.databaseService.remove(`path/to/data/${id}`);
  }
}
