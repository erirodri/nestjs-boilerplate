import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEmploymentDto {
  @ApiProperty({ example: 28500.5, type: Number })
  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @ApiProperty({
    example: 'Monthly',
    enum: ['Monthly', 'Weekly', 'ByWeekly', 'Fourteen'],
  })
  @IsNotEmpty()
  @IsIn(['Monthly', 'Weekly', 'ByWeekly', 'Fourteen'])
  paymentType: string;

  @ApiProperty({ example: 'Technology', type: String })
  @IsNotEmpty()
  @IsString()
  industry: string;

  @ApiProperty({ example: 'OpenAI', type: String })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({
    example: '2020-03-15T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  startYear: string;

  @ApiProperty({ example: 5, type: Number })
  @IsNotEmpty()
  @IsNumber()
  seniority: number;

  @ApiProperty({ example: 'Software Engineer', type: String })
  @IsNotEmpty()
  @IsString()
  position: string;
}
