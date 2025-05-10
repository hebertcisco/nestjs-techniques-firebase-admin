import { PartialType } from '@nestjs/swagger';
import { SetDataDto } from './SetDataDto';

export class UpdateDataDto extends PartialType(SetDataDto) {}
