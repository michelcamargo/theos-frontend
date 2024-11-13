import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GithubUserDto {
  @IsNumber()
  id: number;

  @IsString()
  login: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  node_id: string;

  @IsString()
  avatar_url: string;

  @IsString()
  events_url: string;

  @IsString()
  followers_url: string;

  @IsString()
  following_url: string;

  @IsString()
  gists_url: string;

  @IsString()
  gravatar_id: string;

  @IsString()
  html_url: string;

  @IsString()
  organizations_url: string;

  @IsString()
  received_events_url: string;

  @IsString()
  repos_url: string;

  @IsBoolean()
  site_admin: boolean;

  @IsString()
  starred_url: string;

  @IsString()
  subscriptions_url: string;

  @IsString()
  type: string;

  @IsString()
  user_view_type: string;
}
