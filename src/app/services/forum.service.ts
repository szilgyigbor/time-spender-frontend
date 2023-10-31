import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostData } from '../interfaces/post-data';
import { CommentData } from '../interfaces/comment-data';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ForumService {
  
    constructor(private http: HttpClient) { }
  
    getPosts() {
      return this.http.get<PostData[]>(`${environment.backend_url}/api/forum/getposts`);
    }

    getPostById(id: number) {
      return this.http.get<PostData>(`${environment.backend_url}/api/forum/getpost/${id}`);
    }
  
    addPost(postData: PostData) {
      return this.http.post(`${environment.backend_url}/api/forum/addpost`, postData);
    }

    addComment(commentData: CommentData) {
        return this.http.post(`${environment.backend_url}/api/forum/addcomment`, commentData);
    }

  }