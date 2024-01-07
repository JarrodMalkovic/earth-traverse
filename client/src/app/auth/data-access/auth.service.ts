import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { CacheService } from 'src/app/shared/data-access/cache.service';

interface User {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private cacheService: CacheService) {
    this.http
      .get<any>('/auth/self', {
        withCredentials: true,
      })
      .pipe(
        tap((user) => this.currentUserSubject.next(user)),
        catchError(() => of(null))
      )
      .subscribe();
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<any>('/auth/login', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  signup(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<any>('/auth/signup', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      })
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  isUserLoggedIn(): boolean {
    return true;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  logout(): void {
    this.http
      .post<any>(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe();
    this.currentUserSubject.next(null);
  }
}
