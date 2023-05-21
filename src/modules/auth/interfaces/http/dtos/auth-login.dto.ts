import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
