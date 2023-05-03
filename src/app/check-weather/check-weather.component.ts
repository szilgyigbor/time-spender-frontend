import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tisp-check-weather',
  templateUrl: './check-weather.component.html',
  styleUrls: ['./check-weather.component.css']
})
export class CheckWeatherComponent {

  location: string = 'budapest';
  imageUrl: string = '';
  pictureDatas: any = [];

  constructor(private http: HttpClient) { }

  sendLocation() {
    this.http.post('/api/getimage', JSON.stringify(this.location), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .subscribe((data) => {
        console.log('Data:', data);
        this.pictureDatas = data
        this.imageUrl = this.pictureDatas.sizes.size.find((size: { label: string; }) => size.label === "Large").source;
        console.log('Image url:', this.imageUrl);
        document.body.style.backgroundImage = "url('" + this.imageUrl + "')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center"; 
        
      });
  }


  ngOnInit(): void {
    this.sendLocation();
  }

}
