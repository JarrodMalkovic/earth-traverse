import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/data-access/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="backdrop-blur-lg bg-white/10 shadow-2xl bg-opacity-90 border-b-2 border-white/10 z-50 relative"
    >
      <div class="mx-auto container max-w-7xl">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a routerLink="/">
                <img
                  class="hidden h-10 w-10 lg:block"
                  src="/assets/logo.webp"
                  alt="Your Company"
                />
              </a>
            </div>
            <div class="hidden sm:ml-3 sm:block">
              <div class="flex space-x-2">
                <a
                  class="px-3 py-2 text-md font-medium text-slate-300 hover:bg-white/10 hover:text-white transition rounded-xl"
                  [routerLinkActive]="['rounded-xl', 'text-white']"
                  [routerLinkActiveOptions]="{ exact: true }"
                  routerLink="/"
                >
                  Browse Maps
                </a>
                <a
                  class="px-3 py-2 text-md font-medium text-slate-300 hover:bg-white/10 hover:text-white transition rounded-xl"
                  [routerLinkActive]="['text-white']"
                  routerLink="/leaderboard"
                >
                  Leaderboard
                </a>
              </div>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div *ngIf="currentUser$ | async as currentUser; else loggedOut">
              <div class="flex items-center">
                <div class="w-32">
                  <h1 class="text-white text-sm font-bold mb-1">Level 2</h1>
                  <app-progress-bar
                    [size]="'sm'"
                    [percentageComplete]="0.5"
                  ></app-progress-bar>
                </div>
                <div class="relative ml-3">
                  <div class="flex space-x-2 w-full">
                    <button
                      type="button"
                      class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      (click)="toggleDropdown($event)"
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://www.gravatar.com/avatar/65355e2b41b0f4e1da2d2c188e26d98e?default=identicon"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
              <app-dropdown
                [isOpen]="showDropdown"
                (closeDropdown)="closeDropdown()"
              >
                <div class="z-50">
                  <button
                    class="text-white w-full text-left p-2 text-sm font-bold hover:bg-white/20"
                    routerLink="/u/{{ currentUser.username }}"
                  >
                    Profile
                  </button>
                  <button
                    class="border-t-2 border-white/10 text-white italic w-full text-left p-2 text-sm font-bold hover:bg-white/20"
                    (click)="logout()"
                  >
                    Logout
                  </button>
                </div>
              </app-dropdown>
            </div>

            <ng-template #loggedOut>
              <a
                class="px-3 py-2 text-md font-medium text-slate-300 hover:bg-white/10 hover:text-white transition rounded-xl"
                [routerLinkActive]="['text-white']"
                routerLink="/auth/signin"
              >
                Sign In
              </a>
              <a
                class="px-3 py-2 text-md font-medium text-slate-300 hover:bg-white/10 hover:text-white transition rounded-xl"
                [routerLinkActive]="['text-white']"
                routerLink="/auth/signup"
              >
                Sign Up
              </a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  currentUser$!: Observable<any | null>;
  showDropdown: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  logout(): void {
    this.authService.logout();
    this.showDropdown = false;
  }
}
