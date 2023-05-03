import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationItem, WeatherItem } from '../interfaces/weather-item';

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

  constructor(private http: HttpClient) { 
    
  }

  sendLocation() {
    console.log('Location:', this.location);
    this.getImageUrl(this.location);
    this.getWeatherData(this.location);
    
  }

  getImageUrl(location: string) {
    this.http.post('/api/getimage', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .subscribe((data) => {
        this.pictureDatas = data
        const imageUrl = this.pictureDatas.sizes.size.find((size: { label: string; }) => size.label === "Large").source;
        this.imageUrl = `url('${imageUrl}')`;
        console.log('Image url:', this.imageUrl);
      });
  }

  getWeatherData(location: string) {
    this.http.post('/api/getweather', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .subscribe((data: any) => {
      console.log('WeatherData:', data);
      this.weatherItems = data as WeatherItem;
      console.log('WeatherData:', this.weatherItems.location.country);
      console.log('WeatherData:', this.weatherItems.location.name);
      console.log('WeatherData:', this.weatherItems.current.temp_c);
      console.log('WeatherData:', this.weatherItems.current.condition.icon);
      console.log('WeatherData:', this.weatherItems.current.condition.text);
    });
  }


  ngOnInit(): void {
    //this.sendLocation();
  }

}
