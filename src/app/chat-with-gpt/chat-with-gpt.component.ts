import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostRequestsService } from '../services/post-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tisp-chat-with-gpt',
  templateUrl: './chat-with-gpt.component.html',
  styleUrls: ['./chat-with-gpt.component.css']
})

export class ChatWithGptComponent implements OnInit {
  @ViewChild('messagesContainer', { read: ElementRef })
  private messagesContainer!: ElementRef;

  isRecording = false;
  conversationContent: {role: string, content: string}[] = [];
  mediaRecorder: any;
  audioChunks: any[] = [];
  inputText: string = '';
  username: string = '';

  constructor(private postRequestService: PostRequestsService, private router: Router ) {

    if (!!localStorage.getItem('currentUser') ==  false) {
      alert('You must be logged in to use this feature!');
      this.router.navigate(['/login']);
    }

    this.username = JSON.parse(localStorage.getItem('currentUser')!).username;
  }

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
        });
      });
  }

  startRecording() {
    this.audioChunks = [];
    this.isRecording = true;
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }

  sendAudioToTranscript(audioFile: File) {
    this.postRequestService.sendAudioFile(audioFile).subscribe((response: { toString: () => any; }) => {
      this.conversationContent.push({role: 'user', content: response.toString()});
      this.sendMessage();
    });
  }

  sendTextMessage() {
    this.conversationContent.push({role: 'user', content: this.inputText});
    this.sendMessage();
    this.inputText = '';
  }

  sendMessage() {
    this.postRequestService.sendGptMessageHistory(this.conversationContent).subscribe((response: {role: string, content: string}[]) => {
      this.conversationContent = response;
      this.speak(response[response.length - 1].content);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
 
}
