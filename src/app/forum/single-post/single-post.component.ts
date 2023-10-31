import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';
import { PostData } from 'src/app/interfaces/post-data';
import { CommentData } from 'src/app/interfaces/comment-data';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'tisp-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {

  currentPost: PostData = {} as PostData;
  newComment: CommentData = {} as CommentData;
  username: string = "";
  showTextarea: boolean = false;

  constructor(private forumService: ForumService, private route: ActivatedRoute, private router: Router,
    private dialogService: DialogService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.checkUser();

    console.log(id);
    this.getPostById(id);
  }

  getPostById(id: number) {
    this.forumService.getPostById(id).subscribe(
      (data) => {
        this.currentPost = data;
      }
    );
  }

  addComment() {

    if (!this.showTextarea) {
      this.showTextarea = true;
      return;
    }

    if (this.showTextarea) {
        this.newComment.postId = this.currentPost.id;
        this.newComment.createdAt = new Date();
        this.newComment.author = this.username;
        this.forumService.addComment(this.newComment).subscribe(
        (data) => {
          console.log("Comment added");
          this.getPostById(this.currentPost.id);
          this.newComment = {} as CommentData;
          this.showTextarea = false;
        }
      );
    }
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

  deletePost(id: number) {
    this.dialogService.openDialog('Biztos, hogy törölni akarod ezt a posztot?').then(result => {
      if (result) {
        this.forumService.deletePost(id).subscribe(
          (data) => {
            console.log("Post deleted");
            this.router.navigate(['/forum']);
          }
        );
      } 
      else {
        return;
      }
    });
  }

  checkUser() {
    if (localStorage.getItem('currentUser')) {
      this.username = JSON.parse(localStorage.getItem('currentUser')!).username;
    }
  }
}
