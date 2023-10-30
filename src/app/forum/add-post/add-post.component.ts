import { Component } from '@angular/core';
import { PostData } from 'src/app/interfaces/post-data';
import { ForumService } from 'src/app/services/forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tisp-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  newPost: PostData = {} as PostData;
  username: string = "";

  constructor( private forumService: ForumService, private router: Router) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('currentUser')!).username;
  }

  addPost() {
    this.newPost.author = this.username;
    this.newPost.createdAt = new Date();
    this.newPost.likeCount = 0;
    this.newPost.dislikeCount = 0;
    this.forumService.addPost(this.newPost).subscribe(
      (data) => {
        this.router.navigate(['/forum']);
      }
    );
  }
}
