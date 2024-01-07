import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse, ApiStatus } from 'src/app/shared/data-access/api.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getMaps(): Observable<ApiResponse<any[]>> {
    return this.http.get<any>('/maps').pipe(
      map((mapResponse) => ({
        status: ApiStatus.SUCCESS,
        result: mapResponse.content,
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
