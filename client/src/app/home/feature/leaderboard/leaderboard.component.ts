import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../../data-access/leaderboard.service';
import { Observable } from 'rxjs';
import { ApiStatus } from 'src/app/shared/data-access/api.model';
import { SeoService } from 'src/app/shared/utils/seo.service';

@Component({
  selector: 'app-leaderboard',
  template: `
    <app-navbar></app-navbar>
    <div class="container mx-auto mt-8 mb-8 max-w-7xl px-8">
      <h1 class="text-white text-5xl font-bold font-sans mb-4">Top players</h1>
      <ng-container *ngIf="leaderboard$ | async as response">
        <!-- Loading State -->
        <div
          class="mt-8 backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
          *ngIf="response.status === ApiStatus.LOADING"
        >
          <table class="w-full text-sm text-left text-gray-400 table-fixed">
            <thead
              class="text-xs uppercase text-gray-400 border-b  border-gray-600"
            >
              <tr>
                <th scope="col" class="px-6 py-3 w-1/12">Rank</th>
                <th scope="col" class="py-3 w-4/12">Player Name</th>
                <th scope="col" class="text-right px-6 py-3 w-2/12">Map</th>
                <th scope="col" class="text-right px-6 py-3 w-2/12">
                  Distance
                </th>
                <th scope="col" class="text-right px-6 py-3 w-2/12">Score</th>
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
                  'border-b border-b-1 border-white/10': !last
                }"
              >
                <td class="text-right rounded-full w-1/12 px-6 py-4">
                  <div class="bg-gray-400 h-4"></div>
                </td>
                <td class="text-right rounded w-1/12 pr-6 py-4">
                  <div class="flex items-center">
                    <svg
                      class="w-10 h-10 mr-3 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                      />
                    </svg>
                    <div class="bg-gray-400 h-4 w-full"></div>
                  </div>
                </td>
                <td class="text-right rounded w-1/12 px-6 py-4">
                  <div class="bg-gray-400 h-4"></div>
                </td>
                <td class="text-right rounded w-1/12 px-6 py-4">
                  <div class="bg-gray-400 h-4"></div>
                </td>
                <td class="text-right rounded w-1/12 px-6 py-4">
                  <div class="bg-gray-400 h-4"></div>
                </td>
                <td class="text-right rounded w-1/12 px-6 py-4">
                  <div class="bg-gray-400 h-4"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Success State -->
        <div
          *ngIf="response.status === ApiStatus.SUCCESS"
          class="mt-8 backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
        >
          <div class="overflow-x-auto">
            <table
              class="w-full text-sm text-left text-gray-400 table-fixed min-w-[1100px]"
            >
              <thead
                class="text-xs uppercase text-gray-400 border-b  border-white/10"
              >
                <tr>
                  <th scope="col" class="px-6 py-3 w-1/12">Rank</th>
                  <th scope="col" class="py-3 w-4/12">Player Name</th>
                  <th scope="col" class="text-right px-6 py-3 w-2/12">Map</th>
                  <th scope="col" class="text-right px-6 py-3 w-2/12">
                    Distance
                  </th>
                  <th scope="col" class="text-right px-6 py-3 w-2/12">Score</th>
                  <th scope="col" class="text-right px-6 py-3 w-2/12">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let item of response.result;
                    let last = last;
                    let index = index
                  "
                  [ngClass]="{
                    'border-b border-b-1 border-white/10': !last
                  }"
                >
                  <td class="px-6 py-4 text-white">#{{ index + 1 }}</td>
                  <td class="pr-3 py-4 text-white">
                    <a
                      class="flex items-center hover:underline group"
                      routerLink="/u/{{ item.user.username }}"
                    >
                      <img
                        class="h-10 w-10 rounded-full mr-3 border-gray-600 border-2 group-hover:border-gray-300"
                        src="https://www.gravatar.com/avatar/65355e2b41b0f4e1da2d2c188e26d98e?default=identicon"
                        alt=""
                      />{{ item.user.username }}
                    </a>
                  </td>
                  <td class="text-right px-6 py-4 text-white">
                    {{ item.round.location.country }}
                  </td>
                  <td class="text-right px-6 py-4 text-white">
                    {{ item.distance | number : '1.0-0' }} km
                  </td>
                  <td class="text-right px-6 py-4 text-white">
                    {{ item.distance | number : '1.0-0' }} points
                  </td>
                  <td class="text-right px-6 py-4 text-white">
                    {{ item.timestamp | date : 'short' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="response.status === ApiStatus.ERROR" class="mt-8">
          <p>Error loading leaderboard.</p>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit {
  ApiStatus = ApiStatus;

  leaderboard$!: Observable<any>;
  loadingRows = new Array(20).fill(0);

  constructor(
    private leaderboardService: LeaderboardService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.leaderboard$ = this.leaderboardService.getLeaderboard();

    this.seoService.setPageTags({
      title: "Global Leaderboard - EarthTraverse's Top Explorers",
      description:
        "See who's leading the way in EarthTraverse! Check out our global leaderboard to discover top explorers and their achievements. Compare your progress and get inspired to climb the ranks in your next adventure.",
    });
  }
}
