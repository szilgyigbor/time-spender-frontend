import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostRequestsService {

  constructor(private http: HttpClient) { }

  postImageRequest(location: string) {
    return this.http.post('/api/getimage', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  postWeatherRequest(location: string) {
    return this.http.post('/api/getweather', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendAudioFile(file: File) {
    const formData = new FormData();
    formData.append('audioFile', file);
  
    return this.http.post('http://localhost:5000/transcribe', formData);
}

}