import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import GithubHelpers from '../../helpers/github.helpers';
import { CustomUser, GithubUser } from './interfaces/github-user';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async listAllGithubUsers(): Promise<CustomUser[]> {
    const fetchedUsers = await this.githubService.getUserList();

    return fetchedUsers.map((githubUser: GithubUser) =>
      GithubHelpers.parseUser(githubUser),
    );
  }

  @Get('/search')
  async findGithubUsers(
    @Query('username') username?: string,
    @Query('fullname') fullname?: string,
  ): Promise<CustomUser[]> {
    if (!fullname && !username) return null;

    const { items: foundUsers } = await this.githubService.searchUsers({ username, fullname })

    if (!foundUsers) return null;
    
    return foundUsers.map(user => GithubHelpers.parseUser(user));
  }
}
