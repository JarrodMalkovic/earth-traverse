import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';

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
    <div class="container mx-auto max-w-7xl">
      <div class="flex items-center border-b-2 border-white/10 pb-4">
        <app-three-scene></app-three-scene>
        <div class="ml-8 w-full">

        <h2 class="text-slate-400 text-lg font-bold font-sans italic">
            Level 2 - 1000 XP
          </h2>
          <h1 class="text-white text-6xl font-bold font-sans mb-4">
            Username
          </h1>
          <div class="w-2/3 mb-4">
            <app-progress-bar [percentageComplete]="0.5"></app-progress-bar>
          </div>
          <p class="text-white mb-4" > This is my bio!!This is my bio!!! This is my bio!!! This is my bio!!! v v v vThis is my bio!!! This is my bio!!! v This is my bio!!! This is my bio!!! This is my bio!!! This is my bio!!! This is my bio!!!</p>

          <div class="relative inline-block">
                  <div class="absolute translate-y-1 inset-0 bg-lime-600 rounded-xl"></div>
                  <button class="relative w-full h-full bg-lime-500 text-white font-bold py-2 px-4 rounded-xl active:translate-y-1 active:bg-lime-500">

                    Edit Profile
                  </button>
            </div>

        </div>
      </div>

      <div class="mt-8 grid grid-cols-3 gap-8" >
        <div class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2">
          <h2 class="text-slate-300">Average Guess</h2>
          <h2 class="text-4xl font-bold text-white">10,323</h2>
          <h2 class="text-slate-300">Last 30 days</h2>
        </div>

        <div class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2">
          <h2 class="text-slate-300">Average Guess</h2>
          <h2 class="text-4xl font-bold text-white">10,323</h2>
          <h2 class="text-slate-300">Last 30 days</h2>
        </div>

        <div class="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2">
          <h2 class="text-slate-300">Average Guess</h2>
          <h2 class="text-4xl font-bold text-white">10,323</h2>
          <h2 class="text-slate-300">Last 30 days</h2>
        </div>
      </div>

      <div class="mt-8 backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-xl bg-opacity-10 flex-col space-y-2">
        <table class="w-full text-sm text-left text-gray-400 table-fixed">
        <thead class="text-xs uppercase text-gray-400 border-b  border-gray-700">
            <tr>
                <th scope="col" class="pr-3 py-3  w-3/5">
                    Product name
                </th>
                <th scope="col" class="text-right  px-6 py-3">
                    Color
                </th>
                <th scope="col" class="text-right  px-6 py-3">
                    Category
                </th>
                <th scope="col" class="text-right py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b  border-gray-700">
                <th scope="row" class="pr-3 py-4 font-medium whitespace-nowrap text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="text-right  px-6 py-4">
                    Silver
                </td>
                <td class="text-right  px-6 py-4">
                    Laptop
                </td>
                <td class="text-right py-4">
                    $2999
                </td>
            </tr>
            <tr class="border-b  border-gray-700">
                <th scope="row" class="pr-3 py-4 font-medium whitespace-nowrap text-white">
                    Microsoft Surface Pro
                </th>
                <td class="text-right  px-6 py-4">
                    White
                </td>
                <td class="text-right  px-6 py-4">
                    Laptop PC
                </td>
                <td class="text-right py-4">
                    $1999
                </td>
            </tr>
            <tr class="">
                <th scope="row" class="pr-3 py-4 font-medium whitespace-nowrap text-white">
                    Magic Mouse 2
                </th>
                <td class="text-right  px-6 py-4">
                    Black
                </td>
                <td class="text-right  px-6 py-4">
                    Accessories
                </td>
                <td class="text-right py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
      </div>
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

}
