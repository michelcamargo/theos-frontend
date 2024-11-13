import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as process from 'node:process';
import { GithubUserDto } from './dto/github-user.dto';

@Injectable()
export class GithubService {
  private readonly apiUrl: string = process.env.GITHUB_API_URL;
  private readonly apiToken: string = process.env.GITHUB_API_TOKEN;
  private readonly axios: AxiosInstance = axios.create({
    baseURL: this.apiUrl,
    headers: {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  constructor() {}

  async getUserList(): Promise<GithubUserDto[]> {
    const response = await this.axios.get<GithubUserDto[]>(`/users`);
    return response.data;
  }

  async getByUsername(searchReference: string): Promise<GithubUserDto> {
    const response = await this.axios.get<GithubUserDto>(
      `/users/${searchReference}`,
    );
    return response.data;
  }

  async getByFullname(searchReference: string): Promise<GithubUserDto> {
    const response = await this.axios.get<GithubUserDto[]>(
      `/users?q=${searchReference}+in:fullname`,
    );

    console.log({ byUsername: response.data });

    return response.data[0];
  }
}
