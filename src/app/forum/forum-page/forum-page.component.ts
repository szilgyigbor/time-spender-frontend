import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostData } from 'src/app/interfaces/post-data';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'tisp-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent {

  allPosts: PostData[] = [];

  constructor(private forumService: ForumService, private router: Router) { }

  ngOnInit(): void {

    this.getPosts();
  }

  getPosts() {
    this.forumService.getPosts().subscribe(
      (data) => {
        this.allPosts = data;
      }
    );
  }

  goToPost(id: number) {
    this.router.navigate(['/forum', id]);
  }

}
