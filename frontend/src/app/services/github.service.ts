import { Injectable } from '@angular/core';
import { CustomUser } from '../models/custom-user.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonQueryListConfig } from '../types/query';
import {ThirdPartyUserSearchDTO} from '../models/third-party-user.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = `${environment.apiUrl}/github`;
  private defaultQueryListConfig = {
    page: 1
  };

  constructor(private http: HttpClient) {}

  private getConfig(inheritConfig?: Partial<CommonQueryListConfig>) {
    return {
      ...this.defaultQueryListConfig,
      ...inheritConfig,
    }
  }

  searchUsers({ username, fullname }: ThirdPartyUserSearchDTO, config?: CommonQueryListConfig): Observable<Partial<CustomUser>[]> {
    if (!username && !fullname) return new Observable<Partial<CustomUser>[]>()

    const queryUsername = username ? `username=${username}${fullname && '&'}` : '';
    const queryFullname = fullname ? `fullname=${fullname}` : '';

    return this.http.get<Partial<CustomUser[]>>(`${this.apiUrl}/search?${queryUsername}${queryFullname}&page=${this.getConfig(config).page}`);
  }

  getUserByUsername(username: string): Observable<Partial<CustomUser>[]> {
    return this.http.get<Partial<CustomUser[]>>(`${this.apiUrl}/users?username=${username}`);
  }
}
