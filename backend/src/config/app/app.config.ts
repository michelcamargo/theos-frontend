import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('app', () => {
  return {
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    port: process.env.PORT,
    githubApiUrl: process.env.GITHUB_API_URL,
    githubApiToken: process.env.GITHUB_API_TOKEN,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
});
