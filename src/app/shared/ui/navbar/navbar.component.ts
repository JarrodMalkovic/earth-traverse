import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="backdrop-blur-lg bg-white/10 shadow-2xl bg-opacity-90 border-b-2 border-white/10">
    <div class="mx-auto container max-w-7xl">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="block h-8 w-12 lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=600" alt="Your Company">
            <img class="hidden h-8 w-12 lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=lime&shade=400" alt="Your Company">
          </div>
          <div class="hidden sm:ml-3 sm:block">
            <div class="flex space-x-2">
              <a class="rounded-xl px-3 py-2 text-md font-medium text-white">Browse Maps</a>
              <a class="rounded-xl px-3 py-2 text-md font-medium text-slate-300 hover:bg-white/10 hover:text-white transition">Leaderboard</a>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex items-center">
            <div class='w-32'>
<h1 class="text-white text-sm font-bold mb-1"> Level 2</h1>
          <app-progress-bar [size]="'sm'"  [percentageComplete]="0.5"></app-progress-bar>
</div>
            <div class="relative ml-3">
              <div class="flex space-x-2 w-full">
            
                <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

}
