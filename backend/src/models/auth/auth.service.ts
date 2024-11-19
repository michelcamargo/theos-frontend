import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as process from 'node:process';
import { GithubAuthResponse } from './types/auth';

@Injectable()
export class AuthService {
  private readonly clientId = process.env.GITHUB_CLIENT_ID;
  private readonly clientSecret = process.env.GITHUB_CLIENT_SECRET;
  private readonly apiUrl: string = process.env.GITHUB_API_URL;
  private readonly authUrl: string = process.env.GITHUB_AUTH_URL;

  private readonly api: AxiosInstance = axios.create({
    baseURL: this.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {}

  async getAuthConfigByCode(code: string): Promise<GithubAuthResponse> {
    const body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
    };

    try {
      const tokenResponse = await this.api.post(
        `${this.authUrl}/access_token`,
        body,
      );

      if (!tokenResponse.data) {
        console.error(tokenResponse.data);
        return null;
      }

      const responseUri = tokenResponse.data;

      const params = new URLSearchParams(responseUri);
      const authReponse = Object.fromEntries(params.entries());

      return authReponse as GithubAuthResponse;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getGithubUser(authConfig: GithubAuthResponse): Promise<any> {
    try {
      const { access_token, token_type } = authConfig;

      if (!access_token || !token_type) {
        return null;
      }

      const response = await this.api.get(`/user`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário em github:', error);
      throw error;
    }
  }
}
