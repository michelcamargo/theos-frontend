import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty()
  @IsUrl()
  githubUrl: string;

  @IsNotEmpty()
  @IsUrl()
  avatarUrl: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsString({ each: true })
  skills: string[];
}
