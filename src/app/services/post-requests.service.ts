import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpData } from '../interfaces/sign-up-data';

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
  
    return this.http.post('http://localhost:5000/pia/transcribe', formData);
  }

  sendMessageHistory(history: {role: string, content: string}[]) {
    return this.http.post<{role: string, content: string}[]>('http://localhost:5000/pia/get-answer', JSON.stringify(history), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendSignUpData(signUpData: SignUpData) { 
    return this.http.post('/api/user/signup', JSON.stringify(signUpData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   }

}