import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`/users/${username}/profile`);
  }

  getUserStatistics(username: string): Observable<any> {
    return this.http.get(`/users/${username}/statistics`);
  }
}
