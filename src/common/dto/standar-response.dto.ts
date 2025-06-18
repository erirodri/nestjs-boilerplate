import { ApiProperty } from '@nestjs/swagger';

export class StandardResponse<T> {
  @ApiProperty({ example: false })
  error: boolean;

  @ApiProperty({ example: 'Operación exitosa' })
  msg: string;

  @ApiProperty({ type: Object, nullable: true })
  additionalData?: Record<string, any> | null;

  @ApiProperty({ nullable: true })
  data: T | null;
}
