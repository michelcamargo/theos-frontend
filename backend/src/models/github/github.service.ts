import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as process from 'node:process';
import { GithubUserDto } from './dto/github-user.dto';
import {PaginatedResponse} from "../../types/pagination";

interface GithubSearchUserParams {
  username?: string;
  fullname?: string;
}

@Injectable()
export class GithubService {
  private readonly apiUrl: string = process.env.GITHUB_API_URL;
  private readonly apiToken: string = process.env.GITHUB_API_TOKEN;
  private readonly axios: AxiosInstance = axios.create({
    baseURL: this.apiUrl,
    headers: {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
  });

  constructor() {}

  async getUserList(): Promise<GithubUserDto[]> {
    const response = await this.axios.get<GithubUserDto[]>(`/users`);
    
    return response.data as GithubUserDto[];
  }

  async getByUsername(searchReference: string): Promise<GithubUserDto> {
    const response = await this.axios.get<GithubUserDto>(
      `/users/${searchReference}`,
    );
    return response.data as GithubUserDto;
  }
  
  async searchUsers({ username, fullname }: GithubSearchUserParams): Promise<PaginatedResponse<GithubUserDto>> {
    const query = username ? `?q=user:${username}` : (fullname ? `?q=fullname:${fullname}` : '');
    const response = await this.axios.get<PaginatedResponse<GithubUserDto>>(`/search/users${query}`);
    return response.data as PaginatedResponse<GithubUserDto>;
  }
}
