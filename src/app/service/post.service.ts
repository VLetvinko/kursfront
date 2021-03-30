import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Post} from '../interf';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private Url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPosts(): Observable<Post[]>{
    const url = this.Url + '/posts/post';
    return this.http.get<Post[]>(url).pipe();
  }

  addImage(image: FormData){
    const url = this.Url + '/image';
    return this.http.post(url, image).subscribe();
  }

  getPost(id: number){
    const url = this.Url + `/posts/post/${id}`;
    return this.http.get<Post>(url).pipe();
  }

  addPost(post: Post): Observable<any>{
    const url = this.Url + '/posts/post';
    return this.http.post(url, post, this.httpOptions);
  }

  deletePost(post: Post | number): Observable<Post>{
    const id = typeof post === 'number' ? post : post.id;
    const url = this.Url + `/posts/post/${id}`;

    return this.http.delete<Post>(url, this.httpOptions).pipe();
  }
}
