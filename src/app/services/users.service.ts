import { Injectable } from '@angular/core';
import { CustomUser } from '../models/custom-user.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getUserInfo(searchReference: string): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.apiUrl}/users/${searchReference}`);
  }

  getUsers(): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.apiUrl}/users`);
  }
}
