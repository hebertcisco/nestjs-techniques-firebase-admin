import { IsNotEmpty, IsString } from 'class-validator';

export class SetDataDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
