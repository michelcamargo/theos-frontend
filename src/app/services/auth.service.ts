import { Injectable } from '@angular/core';
import { CustomUser } from '../models/custom-user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getAuthUser(code: string): Observable<CustomUser> {
    return this.http.post<CustomUser>(`${this.authUrl}/callback`, { code });
  }
}
