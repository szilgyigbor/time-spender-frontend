import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'tisp-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {

  constructor(private forumService: ForumService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.getPostById(id);
  }

  getPostById(id: number) {
    this.forumService.getPostById(id).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

}
