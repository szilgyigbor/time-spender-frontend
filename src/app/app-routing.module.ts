import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadNewsComponent } from './read-news/read-news.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckWeatherComponent } from './check-weather/check-weather.component';
import { ChatWithGptComponent } from './chat-with-gpt/chat-with-gpt.component';
import { PlayFowComponent } from './play-fow/play-fow.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'read-news', component: ReadNewsComponent },
  { path: 'check-weather', component: CheckWeatherComponent },
  { path: 'chat-with-gpt', component: ChatWithGptComponent },
  { path: 'play-fow', component: PlayFowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
