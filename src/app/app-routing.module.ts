import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadNewsComponent } from './read-news/read-news.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckWeatherComponent } from './check-weather/check-weather.component';
import { ChatWithGptComponent } from './chat-with-gpt/chat-with-gpt.component';
import { PlayFowComponent } from './play-fow/play-fow.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { OnlineShooterComponent } from './online-shooter/online-shooter.component';
import { NumberSortingComponent } from './number-sorting/number-sorting.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'read-news', component: ReadNewsComponent },
  { path: 'check-weather', component: CheckWeatherComponent },
  { path: 'chat-with-gpt', component: ChatWithGptComponent },
  { path: 'play-fow', component: PlayFowComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'online-shooter', component: OnlineShooterComponent },
  { path: 'number-sorting', component: NumberSortingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
