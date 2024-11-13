import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import GithubHelpers from '../../helpers/github.helpers';
import { CustomUser } from '../github/interfaces/github-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/callback')
  async findOne(@Body('code') code: string): Promise<CustomUser> {
    const userAuthConfig = await this.authService.getAuthConfigByCode(code);
    if (!userAuthConfig) return null;

    const githubUser = await this.authService.getGithubUser(userAuthConfig);
    if (!githubUser) return null;

    return GithubHelpers.parseUser(githubUser);
  }
}
