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

      <div class="grid grid-cols-3 gap-8 mt-8" >
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
        <h2 class="text-slate-300">Recent Activity</h2>

      </div>
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Metric1",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric2",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric3",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric4",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric5",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric6",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric7",
          data: this.generateData(52, {
            min: 0,
            max: 90
          })
        }
        ,

      ],
      chart: {
        height: 350,
        type: "heatmap",
        animations: {
          enabled: false
        },
        background: 'transparent',
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,

      },
      colors: ["#008FFB"],
      title: {

      },
      plotOptions: {
        heatmap: {
          radius: 10,
        }
      },
      yaxis: {
        labels: {
          show: false,
        }
      },
    }
  };


  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
}
