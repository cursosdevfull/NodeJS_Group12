import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;
}
