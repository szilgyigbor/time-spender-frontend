import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';
import { PostData } from 'src/app/interfaces/post-data';
import { CommentData } from 'src/app/interfaces/comment-data';

@Component({
  selector: 'tisp-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {

  currentPost: PostData = {} as PostData;
  newComment: CommentData = {} as CommentData;
  username: string = "";

  constructor(private forumService: ForumService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.username = JSON.parse(localStorage.getItem('currentUser')!).username;
    console.log(id);
    this.getPostById(id);
  }

  getPostById(id: number) {
    this.forumService.getPostById(id).subscribe(
      (data) => {
        console.log(data);
        this.currentPost = data;
      }
    );
  }

  addComment() {
    this.newComment.postId = this.currentPost.id;
    this.newComment.createdAt = new Date();
    this.newComment.author = this.username;
    this.forumService.addComment(this.newComment).subscribe(
      (data) => {
        console.log("Comment added");
        console.log(data);
        this.getPostById(this.currentPost.id);
        this.newComment = {} as CommentData;
      }
    );
    
  }

  deleteComment(id: number) {
    this.dialogService.openDialog('Biztos, hogy törölni akarod ezt a kommentet?').then(result => {
      if (result) {
        this.forumService.deleteComment(id).subscribe(
          (data) => {
            console.log("Comment deleted");
            this.getPostById(this.currentPost.id);
          }
        );
      } 
      else {
        return;
      }
    });
    
  }

}
