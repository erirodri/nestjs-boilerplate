import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'adminUser', type: String })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'adminUser@admin.com', type: String })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'securePassword123', type: String })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.png',
    type: String,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ example: false, type: Boolean })
  @IsOptional()
  @IsBoolean()
  is_disabled?: boolean;
}
