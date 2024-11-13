import { CustomUser } from '../models/github/interfaces/github-user';
import { GithubUserDto } from '../models/github/dto/github-user.dto';

class GithubHelpers {
  public static parseUser(user: GithubUserDto): CustomUser {
    return {
      githubUsername: user.login,
      githubUrl: user.html_url,
      avatarUrl: user.avatar_url,
      name: user.name,
      email: user.email,
      city: '',
      education: '',
      skills: [],
    };
  }
}

export default GithubHelpers;
