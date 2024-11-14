import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import GithubHelpers from '../../helpers/github.helpers';
import { CustomUser, GithubUser } from './interfaces/github-user';

@Controller('users')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async findAll(): Promise<CustomUser[]> {
    const fetchedUsers = await this.githubService.getUserList();

    return fetchedUsers.map((githubUser: GithubUser) =>
      GithubHelpers.parseUser(githubUser),
    );
  }

  @Get('/search')
  async findByUsername(
    @Query('user') username?: string,
    @Query('fullname') fullname?: string,
  ): Promise<CustomUser[]> {
    if (!fullname && !username) return null;

    const foundUsers = fullname
      ? await this.githubService.getByFullname(fullname)
      : await this.githubService.getByUsername(username);

    console.log({ foundUsers });

    if (!foundUsers) return null;

    return foundUsers.map(user => GithubHelpers.parseUser(user));
  }
}
