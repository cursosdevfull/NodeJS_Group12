import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserGetByPageDto {
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
}
