import {
  // decorators here
  Transform,
} from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'adminUser', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', type: String })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class CreatePersonalInfoDto {
  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ example: 'John Doe', type: String })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: '30', type: String })
  @IsNotEmpty()
  @IsString()
  age: string;

  @ApiProperty({ example: 'male', type: String })
  @IsNotEmpty()
  @IsString()
  gener: string;

  @ApiProperty({
    example: '1990-05-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  birth: string;

  @ApiProperty({ example: '123 Main St, New York, NY', type: String })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 90210, type: Number })
  @IsNotEmpty()
  @IsNumber()
  postalCode: number;

  @ApiProperty({ example: 1234567890, type: Number })
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}
