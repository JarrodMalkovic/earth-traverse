import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { UserService } from '../data-access/user.service';
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'app-profile',
  template: `
    <app-navbar></app-navbar>
    <div
      *ngIf="userProfile$ | async as userProfile"
      class="container mx-auto mb-8 max-w-7xl"
    >
      <div class="flex items-center border-b-2 border-white/10 pb-4">
        <app-three-scene></app-three-scene>
        <div class="ml-8 w-full">
          <h2 class="text-slate-400 text-lg font-bold font-sans italic">
            Level 2 - 1000 XP
          </h2>
          <h1 class="text-white text-6xl font-bold font-sans mb-4">
            {{ userProfile.username }}
          </h1>
          <div class="w-2/3 mb-4">
            <app-progress-bar [percentageComplete]="0.5"></app-progress-bar>
          </div>
          <p class="text-white mb-4">No bio provided.</p>
        </div>
      </div>

      <ng-container *ngIf="userStatistics$ | async as userStatistics">
        <div class="mt-8 grid grid-cols-3 gap-8">
          <div
            class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
          >
            <h2 class="text-slate-300">Average Distance</h2>
            <h2 class="text-4xl font-bold text-white">
              {{ userStatistics.averageDistanceLast30Days | number : '1.0-0' }}
              km
            </h2>
            <h2 class="text-slate-300">Last 30 days</h2>
          </div>

          <div
            class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
          >
            <h2 class="text-slate-300">Games Played</h2>
            <h2 class="text-4xl font-bold text-white">
              {{ userStatistics.totalGamesLast30Days }}
            </h2>
            <h2 class="text-slate-300">Last 30 days</h2>
          </div>

          <div
            class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2"
          >
            <h2 class="text-slate-300">Average Game Length</h2>
            <h2 class="text-4xl font-bold text-white">
              {{ userStatistics.averageGameLengthLast30Days }}
            </h2>
            <h2 class="text-slate-300">Last 30 days</h2>
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
                *ngFor="let item of userStatistics.latestGames; let last = last"
                [ngClass]="{
                  'border-b border-b-1 border-gray-600': !last
                }"
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
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  userProfile$!: Observable<any>;
  userStatistics$!: Observable<any>;

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
