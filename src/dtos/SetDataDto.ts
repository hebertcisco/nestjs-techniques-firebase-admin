import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetDataDto {
  @ApiProperty({
    description: 'The name of the data',
    example: 'John Doe',
    minLength: 3,
    maxLength: 50
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message: 'Name can only contain letters, numbers, spaces and hyphens'
  })
  name: string;
}
