import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadNewsComponent } from './read-news/read-news.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { CheckWeatherComponent } from './check-weather/check-weather.component';
import { ChatWithGptComponent } from './chat-with-gpt/chat-with-gpt.component';
import { PlayFowComponent } from './play-fow/play-fow.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { OnlineShooterComponent } from './online-shooter/online-shooter.component';
import { NumberSortingComponent } from './number-sorting/number-sorting.component';
import { AdminGuard } from './guards/auth-guard';
import { ForumPageComponent } from './forum/forum-page/forum-page.component';
import { SinglePostComponent } from './forum/single-post/single-post.component';
import { AddPostComponent } from './forum/add-post/add-post.component';
import { ParallaxComponent } from './parallax/parallax.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'read-news', component: ReadNewsComponent, canActivate: [AdminGuard] },
  { path: 'check-weather', component: CheckWeatherComponent, canActivate: [AdminGuard] },
  { path: 'chat-with-gpt', component: ChatWithGptComponent, canActivate: [AdminGuard] },
  { path: 'play-fow', component: PlayFowComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'online-shooter', component: OnlineShooterComponent, canActivate: [AdminGuard] },
  { path: 'number-sorting', component: NumberSortingComponent, canActivate: [AdminGuard] },
  { path: 'forum', component: ForumPageComponent },
  { path: 'forum/:id', component: SinglePostComponent },
  { path: 'add-post', component: AddPostComponent, canActivate: [AdminGuard] },
  { path: 'parallax', component: ParallaxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
