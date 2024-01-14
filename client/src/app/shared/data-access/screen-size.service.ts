import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}
