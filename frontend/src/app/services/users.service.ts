import { Injectable } from '@angular/core';
import { CustomUser } from '../models/custom-user.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonQueryListConfig } from '../types/query';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;
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

  registerNew(developer: Partial<CustomUser>): Observable<CustomUser> {
    return this.http.post<CustomUser>(`${this.apiUrl}`, developer);
  }

  getUserInfo(searchReference: string, config?: CommonQueryListConfig): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.apiUrl}/search?username=${searchReference}&page=${this.getConfig(config).page}`);
  }

  getUsers(config?: CommonQueryListConfig): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.apiUrl}?page=${this.getConfig(config).page}`);
  }
}
