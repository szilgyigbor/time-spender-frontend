import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class PostRequestsService {

  constructor(private http: HttpClient) { }

  postImageRequest(location: string) {
    /*return this.http.post('https://spender-backend-7753b2e4b87a.herokuapp.com/api/getimage', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }*/

    return this.http.post('http://localhost:23982/api/getimage', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }

    });
  }

  postWeatherRequest(location: string) {
    /*return this.http.post('https://spender-backend-7753b2e4b87a.herokuapp.com/api/getweather', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }*/

    return this.http.post('http://localhost:23982/api/getweather', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendAudioFile(file: File) {
    const formData = new FormData();
    formData.append('audioFile', file);
  
    /*return this.http.post('https://spender-gptbackend-66fcf581c179.herokuapp.com/pia/transcribe', formData);*/

    return this.http.post('http://localhost:5000/pia/transcribe', formData);
  }

  sendMessageHistory(history: {role: string, content: string}[]) {
    /*return this.http.post<{role: string, content: string}[]>('https://spender-gptbackend-66fcf581c179.herokuapp.com/pia/get-answer', JSON.stringify(history), {
      headers: {
        'Content-Type': 'application/json'
      }*/

    return this.http.post<{role: string, content: string}[]>('http://localhost:5000/pia/get-answer', JSON.stringify(history), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendSignUpData(signUpData: UserData) { 
    /*return this.http.post('https://spender-backend-7753b2e4b87a.herokuapp.com/api/user/signup', JSON.stringify(signUpData), {
      headers: {
        'Content-Type': 'application/json'
      }*/

    return this.http.post('/api/user/signup', JSON.stringify(signUpData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   }

   sendLoginData(loginData: UserData) { 
    /*return this.http.post('https://spender-backend-7753b2e4b87a.herokuapp.com/api/user/login', JSON.stringify(loginData), {
      headers: {
        'Content-Type': 'application/json'
      }*/

    return this.http.post('/api/user/login', JSON.stringify(loginData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   }


}