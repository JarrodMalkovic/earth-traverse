import { Injectable } from '@angular/core';

interface CacheContent<T> {
  expiry: number;
  value: T;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheContent<any>>();

  constructor() {}

  get<T>(key: string): T | null {
    const data = this.cache.get(key);
    if (!data) {
      return null;
    }

    const now = Date.now();
    if (now > data.expiry) {
      this.cache.delete(key);
      return null;
    }

    return data.value;
  }

  set<T>(key: string, value: T, ttl: number): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { expiry, value });
  }
}
