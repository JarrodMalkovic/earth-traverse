import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  createGame(createGameRequest: {
    mapId: number;
    numberOfRounds: number;
  }): Observable<any> {
    return this.http.post('/games', createGameRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    });
  }

  getGame(id: number): Observable<any> {
    return this.http.get(`/games/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    });
  }

  submitAnswer(
    id: number,
    submitAnswerRequest: {
      latitudeGuess: number;
      longitudeGuess: number;
      roundNumber: number;
    }
  ) {
    return this.http.post(`/games/${id}/answer`, submitAnswerRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    });
  }
}
