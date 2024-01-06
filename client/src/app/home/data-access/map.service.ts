import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getMaps(): Observable<any[]> {
    return this.http
      .get<any>('/maps')
      .pipe(map((mapResponse) => mapResponse.content));
  }
}
