import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, startWith } from 'rxjs';
import { ApiResponse, ApiStatus } from 'src/app/shared/data-access/api.model';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<ApiResponse<any[]>> {
    return this.http.get<any>('/leaderboard').pipe(
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
      startWith({ status: ApiStatus.LOADING }),
      shareReplay(1)
    );
  }
}
