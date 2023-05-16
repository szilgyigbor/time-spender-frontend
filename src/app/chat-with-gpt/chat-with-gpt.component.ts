import { Component, OnInit } from '@angular/core';

import { PostRequestsService } from '../services/post-requests.service';



@Component({
  selector: 'tisp-chat-with-gpt',
  templateUrl: './chat-with-gpt.component.html',
  styleUrls: ['./chat-with-gpt.component.css']
})
export class ChatWithGptComponent implements OnInit {

  isRecording = false;
  textContent: string = '';

  mediaRecorder: any;
  audioChunks: any[] = [];

  constructor(private postRequestService: PostRequestsService) { }

  ngOnInit(): void {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener("dataavailable", (event: { data: any; }) => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(this.audioChunks, {
            type: 'audio/m4a'
          });

          const audioFile = new File([audioBlob], 'voice.m4a', { type: 'audio/m4a' });

          this.sendAudioToTranscript(audioFile);
          console.log(audioBlob);
        });
      });
  }


  startRecording() {
    this.audioChunks = [];
    this.isRecording = true;
    //this.mediaRecorder.start();
  }

  stopRecording() {
    this.isRecording = false;
    //this.mediaRecorder.stop();
  }


  sendAudioToTranscript(audioFile: File) {
    this.postRequestService.sendAudioFile(audioFile).subscribe(response => {
      console.log(response);
      this.textContent = response.toString();
    });
  }

 
}
