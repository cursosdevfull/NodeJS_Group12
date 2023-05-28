import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserGetOneDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
