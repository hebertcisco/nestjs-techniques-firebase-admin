import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'nestjs-firebase-admin';
import { randomUUID } from 'node:crypto';
import { UpdateDataDto } from './dtos/UpdateDataDto';
import { SetDataDto } from './dtos/SetDataDto';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getData(): Promise<any> {
    const data = await this.databaseService.get('path/to/data');
    if (!data) {
      throw new Error('Data not found');
    }
    return data;
  }

  async setData(data: SetDataDto): Promise<SetDataDto & { id: string }> {
    const id = randomUUID();
    await this.databaseService.set(`path/to/data/${id}`, data);

    return { ...data, id };
  }

  async updateData(id: string, data: UpdateDataDto): Promise<UpdateDataDto> {
    await this.databaseService.update(`path/to/data/${id}`, data);
    return data;
  }

  async deleteData(id: string): Promise<void> {
    await this.databaseService.remove(`path/to/data/${id}`);
  }
}
