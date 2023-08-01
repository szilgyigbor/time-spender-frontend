import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interfaces/user-data';
import { MessageData } from '../interfaces/message-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostRequestsService {

  constructor(private http: HttpClient) { }

  postImageRequest(location: string) {
    return this.http.post(`${environment.backend_url}/api/getimage`, JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }

  postWeatherRequest(location: string) {
    return this.http.post(`${environment.backend_url}/api/getweather`, JSON.stringify(location), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  }

  sendAudioFile(file: File) {
    const formData = new FormData();
    formData.append('audioFile', file);
  
    return this.http.post(`${environment.gpt_backend_url}/pia/transcribe`, formData);

  }

  sendGptMessageHistory(history: {role: string, content: string}[]) {
    return this.http.post<{role: string, content: string}[]>(`${environment.gpt_backend_url}/pia/get-answer`, JSON.stringify(history), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
  }

  sendSignUpData(signUpData: UserData) { 
    return this.http.post(`${environment.backend_url}/api/user/signup`, JSON.stringify(signUpData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
   }

   sendLoginData(loginData: UserData) { 
    return this.http.post(`${environment.backend_url}/api/user/login`, JSON.stringify(loginData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
   }

   sendMainPageMessage(messageData: MessageData) {
    return this.http.post(`${environment.backend_url}/api/messages/addmessage`, JSON.stringify(messageData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
   }


}