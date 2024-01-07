import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse, ApiStatus } from 'src/app/shared/data-access/api.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<ApiResponse<any>> {
    return this.http.get(`/users/${username}/profile`).pipe(
      map((response) => ({
        status: ApiStatus.SUCCESS,
        result: response,
      })),
      catchError((error) =>
        of({
          status: ApiStatus.ERROR,
          error: error,
        })
      ),
      startWith({ status: ApiStatus.LOADING })
    );
  }

  getUserStatistics(username: string): Observable<ApiResponse<any>> {
    return this.http.get(`/users/${username}/statistics`).pipe(
      map((response) => ({
        status: ApiStatus.SUCCESS,
        result: response,
      })),
      catchError((error) =>
        of({
          status: ApiStatus.ERROR,
          error: error,
        })
      ),
      startWith({ status: ApiStatus.LOADING })
    );
  }
}
