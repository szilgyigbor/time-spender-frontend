import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interfaces/user-data';
import { MessageData } from '../interfaces/message-data';

@Injectable({
  providedIn: 'root'
})
export class PostRequestsService {

  //gpt_backend_url = 'https://spender-gptbackend-66fcf581c179.herokuapp.com';
  //backend_url = 'https://spender-backend-7753b2e4b87a.herokuapp.com';
  gpt_backend_url = 'http://localhost:5000';
  backend_url = '';

  constructor(private http: HttpClient) { }

  postImageRequest(location: string) {
    return this.http.post(this.backend_url + '/api/getimage', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }

  postWeatherRequest(location: string) {
    return this.http.post(this.backend_url + '/api/getweather', JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  }

  sendAudioFile(file: File) {
    const formData = new FormData();
    formData.append('audioFile', file);
  
    return this.http.post(this.gpt_backend_url + '/pia/transcribe', formData);

  }

  sendGptMessageHistory(history: {role: string, content: string}[]) {
    return this.http.post<{role: string, content: string}[]>(this.gpt_backend_url + '/pia/get-answer', JSON.stringify(history), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
  }

  sendSignUpData(signUpData: UserData) { 
    return this.http.post(this.backend_url + '/api/user/signup', JSON.stringify(signUpData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
   }

   sendLoginData(loginData: UserData) { 
    return this.http.post(this.backend_url + '/api/user/login', JSON.stringify(loginData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
   }

   sendMainPageMessage(messageData: MessageData) {
    return this.http.post(this.backend_url + '/api/messages/addmessage', JSON.stringify(messageData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
   }


}