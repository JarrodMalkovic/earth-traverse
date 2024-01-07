import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../data-access/user.service';
import { Observable } from 'rxjs';
import { ApiResponse, ApiStatus } from 'src/app/shared/data-access/api.model';

@Component({
  selector: 'app-profile',
  template: `
    <app-navbar></app-navbar>
    <div class="container mx-auto mb-8 max-w-7xl">
      <!-- User Profile -->
      <ng-container *ngIf="userProfile$ | async as response">
        <div *ngIf="response.status === 'loading'">
          <div
            class="flex items-center border-b-2 border-white/10 pb-4  animate-pulse"
          >
            <app-three-scene></app-three-scene>
            <div class="ml-8 w-full">
              <div class="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div class="h-12 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div class="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
            </div>
          </div>
        </div>

        <div *ngIf="response.status === 'success'">
          <div class="flex items-center border-b-2 border-white/10 pb-4">
            <app-three-scene></app-three-scene>
            <div class="ml-8 w-full">
              <h2 class="text-slate-400 text-lg font-bold font-sans italic">
                Level 2 - 1000 XP
              </h2>
              <h1 class="text-white text-6xl font-bold font-sans mb-4">
                {{ response.result.username }}
              </h1>
              <div class="w-2/3 mb-4">
                <app-progress-bar [percentageComplete]="0.5"></app-progress-bar>
              </div>
              <p class="text-white mb-4">No bio provided.</p>
            </div>
          </div>
        </div>

        <div *ngIf="response.status === 'error'">
          <!-- Error message or handling for User Profile -->
        </div>
      </ng-container>

      <!-- User Statistics -->
      <ng-container *ngIf="userStatistics$ | async as response">
        <div *ngIf="response.status === 'loading'">
          <div class="mt-8 grid grid-cols-3 gap-8">
            <div
              class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col"
            >
              <div
                class="h-4 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"
              ></div>
              <div
                class="h-10 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"
              ></div>
              <div class="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
            <div
              class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col"
            >
              <div
                class="h-4 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"
              ></div>
              <div
                class="h-10 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"
              ></div>
              <div class="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
            <div
              class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col"
            >
              <div
                class="h-4 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"
              ></div>
              <div
                class="h-10 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"
              ></div>
              <div class="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div
            class="mt-8 backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
          >
            <table class="w-full text-sm text-left text-gray-400 table-fixed">
              <thead
                class="text-xs uppercase text-gray-400 border-b  border-gray-600"
              >
                <tr>
                  <th scope="col" class="py-3 w-2/12">Name</th>
                  <th scope="col" class="py-3 w-8/12">Description</th>
                  <th scope="col" class="text-right px-6 py-3 w-2/12">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="let loadingRow of loadingRows; let last = last"
                  class="animate-pulse"
                  [ngClass]="{
                    'border-b border-b-1 border-gray-600': !last
                  }"
                >
                  <td class="text-right rounded w-1/12 pr-6 py-4">
                    <div class="flex items-center w-full">
                      <svg
                        class="w-10 h-10 mr-3 rounded-full text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path
                          d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                        />
                      </svg>
                      <div class="bg-gray-400 h-4 w-full"></div>
                    </div>
                  </td>
                  <td class="text-right rounded w-1/12 pr-6 py-3">
                    <div class="bg-gray-400 h-4 w-full"></div>
                  </td>
                  <td class="text-right rounded w-1/12 px-6 py-3">
                    <div class="bg-gray-400 h-4"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div *ngIf="response.status === 'success'">
          <div class="mt-8 grid grid-cols-3 gap-8">
            <div
              class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
            >
              <h2 class="text-slate-300">Average Distance</h2>
              <h2 class="text-4xl font-bold text-white">
                {{
                  response.result.averageDistanceLast30Days | number : '1.0-0'
                }}
                km
              </h2>
              <h2 class="text-slate-300">Last 30 days</h2>
            </div>

            <div
              class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
            >
              <h2 class="text-slate-300">Games Played</h2>
              <h2 class="text-4xl font-bold text-white">
                {{ response.result.totalGamesLast30Days }}
              </h2>
              <h2 class="text-slate-300">Last 30 days</h2>
            </div>

            <div
              class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
            >
              <h2 class="text-slate-300">Average Game Length</h2>
              <h2 class="text-4xl font-bold text-white">
                {{ response.result.averageGameLengthLast30Days }}
              </h2>
              <h2 class="text-slate-300">Last 30 days</h2>
            </div>
          </div>

          <div
            class="mt-8 backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
          >
            <ng-container
              *ngIf="
                response.result.latestGames &&
                  response.result.latestGames.length > 0;
                else noGamesTemplate
              "
            >
              <table class="w-full text-sm text-left text-gray-400 table-fixed">
                <thead
                  class="text-xs uppercase text-gray-400 border-b  border-gray-600"
                >
                  <tr>
                    <th scope="col" class="py-3 w-2/12">Name</th>
                    <th scope="col" class="py-3 w-8/12">Description</th>
                    <th scope="col" class="text-right px-6 py-3 w-2/12">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    *ngFor="
                      let item of response.result.latestGames;
                      let last = last
                    "
                    [ngClass]="{ 'border-b border-b-1 border-gray-600': !last }"
                  >
                    <td class="pr-3 py-4 text-white flex items-center">
                      <img
                        class="h-10 w-10 rounded-full mr-3 border-gray-600 border-2 group-hover:border-gray-300"
                        src="{{ item.map.image }}"
                        alt=""
                      />
                      {{ item.map.title }}
                    </td>
                    <td class="py-4 text-white">
                      {{ item.map.description }}
                    </td>
                    <td class="text-right px-6 py-4 text-white">
                      {{ item.startTime | date : 'short' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </ng-container>

            <!-- Empty State Template -->
            <ng-template #noGamesTemplate>
              <div class="text-center text-white">
                <p>No latest games available.</p>
              </div>
            </ng-template>
          </div>
        </div>

        <div *ngIf="response.status === 'error'">
          <!-- Error message or handling for User Statistics -->
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  ApiStatus = ApiStatus;

  userProfile$!: Observable<ApiResponse<any>>;
  userStatistics$!: Observable<ApiResponse<any>>;
  loadingRows = new Array(5).fill(0);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.userProfile$ = this.userService.getUserProfile(username);
      this.userStatistics$ = this.userService.getUserStatistics(username);
    }
  }
}
