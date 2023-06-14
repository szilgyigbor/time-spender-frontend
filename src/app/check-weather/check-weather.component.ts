import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostRequestsService } from '../services/post-requests.service';
import { WeatherItem } from '../interfaces/weather-item';


@Component({
  selector: 'tisp-check-weather',
  templateUrl: './check-weather.component.html',
  styleUrls: ['./check-weather.component.css']
})
export class CheckWeatherComponent {

  location: string = '';
  pictureDatas: any = [];
  imageUrl: string = '';
  weatherItems: WeatherItem = {} as WeatherItem;

  constructor(private postRequestsService: PostRequestsService, private router: Router) { 
  }

  sendLocation() {
    console.log('Location:', this.location);
    this.postRequestsService.postImageRequest(this.location).subscribe((data: any) => {
      this.pictureDatas = data;
      const imageUrl = this.pictureDatas.sizes.size.find((size: { label: string; }) => size.label === "Large").source;
      this.imageUrl = `url('${imageUrl}')`;
    });
    
    this.postRequestsService.postWeatherRequest(this.location).subscribe((data: any) => {
      console.log('WeatherData:', data);
      this.weatherItems = data as WeatherItem;
    },
    error => {
      if (error.status === 401) {
        alert("Please, login!");
        this.router.navigate(['/login']);
      }
    });
    this.location = '';
  }

  
  


  ngOnInit(): void {
  }

}
