import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadNewsComponent } from './read-news/read-news.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { CheckWeatherComponent } from './check-weather/check-weather.component';
import { ChatWithGptComponent } from './chat-with-gpt/chat-with-gpt.component';
import { PlayFowComponent } from './play-fow/play-fow.component';
import { WeatherDataComponent } from './check-weather/weather-data/weather-data.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { OnlineShooterComponent } from './online-shooter/online-shooter.component';
import { HomePageOpinionsComponent } from './home-page/home-page-opinions/home-page-opinions.component';
import { NumberSortingComponent } from './number-sorting/number-sorting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NewsSlideComponent } from './home-page/news-slide/news-slide.component';
import { UniDialogComponent } from './uni-dialog/uni-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadNewsComponent,
    HomePageComponent,
    HeaderComponent,
    CheckWeatherComponent,
    ChatWithGptComponent,
    PlayFowComponent,
    WeatherDataComponent,
    LoginPageComponent,
    SignUpPageComponent,
    OnlineShooterComponent,
    HomePageOpinionsComponent,
    NumberSortingComponent,
    NewsSlideComponent,
    UniDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
