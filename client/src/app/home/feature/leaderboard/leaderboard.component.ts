import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../../data-access/leaderboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  template: `
    <app-navbar></app-navbar>
    <div class="container mx-auto mt-8 mb-8 max-w-7xl">
      <h1 class="text-white text-5xl font-bold font-sans mb-4">Top players</h1>
      <div
        class="mt-8 backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
      >
        <table class="w-full text-sm text-left text-gray-400 table-fixed">
          <thead
            class="text-xs uppercase text-gray-400 border-b  border-gray-600"
          >
            <tr>
              <th scope="col" class="px-6 py-3 w-1/12">Rank</th>
              <th scope="col" class="py-3 w-4/12">Player Name</th>
              <th scope="col" class="text-right px-6 py-3 w-2/12">Map</th>
              <th scope="col" class="text-right px-6 py-3 w-2/12">Distance</th>
              <th scope="col" class="text-right px-6 py-3 w-2/12">Score</th>
              <th scope="col" class="text-right px-6 py-3 w-2/12">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="
                let item of leaderboard$ | async;
                let last = last;
                let index = index
              "
              [ngClass]="{
                'border-b border-b-1 border-gray-600': !last
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit {
  leaderboard$!: Observable<any>;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboard$ = this.leaderboardService.getLeaderboard();
  }
}
