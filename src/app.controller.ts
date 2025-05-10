import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SetDataDto } from './dtos/SetDataDto';
import { UpdateDataDto } from './dtos/UpdateDataDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<any> {
    return this.appService.getData();
  }

  @Post()
  async setData(@Body() setDataDto: SetDataDto): Promise<SetDataDto> {
    return this.appService.setData(setDataDto);
  }

  @Put('update/:id')
  async updateData(
    @Param('id') id: string,
    @Body() updateDataDto: UpdateDataDto,
  ): Promise<UpdateDataDto> {
    return this.appService.updateData(id, updateDataDto);
  }

  @Delete('delete/:id')
  async deleteData(@Param('id') id: string): Promise<void> {
    return this.appService.deleteData(id);
  }
}
