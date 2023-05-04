import { Component, Input } from '@angular/core';

@Component({
  selector: 'tisp-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent {
  @Input() locationName!: string;
  @Input() country!: string;
  @Input() temperature!: number;
  @Input() icon!: string;
  @Input() text!: string;
  @Input() windStrength!: number;
}
