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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Data Management')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'Returns all data successfully',
    type: [SetDataDto]
  })
  @Get()
  async getData(): Promise<any> {
    return this.appService.getData();
  }

  @ApiOperation({ summary: 'Create new data' })
  @ApiResponse({
    status: 201,
    description: 'Data created successfully',
    type: SetDataDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  @Post()
  async setData(@Body() setDataDto: SetDataDto): Promise<SetDataDto> {
    return this.appService.setData(setDataDto);
  }

  @ApiOperation({ summary: 'Update data by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the data to update',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Data updated successfully',
    type: UpdateDataDto
  })
  @ApiResponse({
    status: 404,
    description: 'Data not found'
  })
  @Put('update/:id')
  async updateData(
    @Param('id') id: string,
    @Body() updateDataDto: UpdateDataDto,
  ): Promise<UpdateDataDto> {
    return this.appService.updateData(id, updateDataDto);
  }

  @ApiOperation({ summary: 'Delete data by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the data to delete',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Data deleted successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Data not found'
  })
  @Delete('delete/:id')
  async deleteData(@Param('id') id: string): Promise<void> {
    return this.appService.deleteData(id);
  }
}
