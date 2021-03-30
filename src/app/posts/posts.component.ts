import { Component, OnInit } from '@angular/core';
import {Post} from '../interf';
import {PostService} from '../service/post.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  isLoggedIn = false;
  filterTerm: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getPost();
  }

  getPost(): void{
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }
}
