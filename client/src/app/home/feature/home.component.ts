import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-navbar></app-navbar>
    <div class="container mx-auto mt-8 max-w-7xl" >
      <div class="grid grid-cols-4 gap-8 mt-8">
        <div
          *ngFor="let game of games"
          routerLink="/play"
          class="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl bg-opacity-90 rounded-xl flex flex-col justify-center items-center shadow-2xl"
        > 
          <div class="h-32 w-full overflow-hidden rounded-t-xl"> 
            <a
              routerLink="/map"  
            >
              <img class="h-full w-full object-cover rounded-t-xl hover:scale-110 transition duration-300" src="{{ game.image }}"/>
            </a>
          </div>
          <div class="m-8 flex items-center flex-col space-y-6">
            <a routerLink="/map" class="text-white text-2xl font-bold hover:underline">{{ game.name }}</a>
            <button 
              class="text-white border-zinc-100 border p-1 rounded-3xl italic w-24 hover:scale-110 transition duration-250"
              routerLink="/play"
            > 
              Play
            </button>
          </div>
          <div class="border-t border-white/10 border-t-2 w-full p-4 text-white text-xs font-semibold">
            <div class="grid grid-cols-3">

            <div class="flex justify-center">test</div>

            <div class="flex justify-center">test</div>

            <div class="flex justify-center">test</div>
            <div>
          </div>
        </div>
      <div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  games = [
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Japan',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'C',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    }, {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    }, {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    }, {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
    {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    }, {
      name: 'Iceland',
      id: '498763468214164',
      image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002487/img/basic/a0002487_main.jpg?20230106161700'
    },
  ]
}
