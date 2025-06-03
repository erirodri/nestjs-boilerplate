import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: String,
    example: '6837f0a14ca560c58ac34e50',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'adminUser',
  })
  @Expose()
  username: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
  })
  @Expose()
  avatar: string;

  @ApiProperty({
    type: String,
    example: 'example@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @Expose()
  is_disabled: boolean;

  @ApiProperty({
    type: String,
    example: '2024-05-29T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    type: String,
    example: '2024-05-29T12:34:56.000Z',
  })
  @Expose()
  updatedAt: Date;
}
