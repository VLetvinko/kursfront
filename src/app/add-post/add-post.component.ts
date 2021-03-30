import { Component, OnInit } from '@angular/core';
import {Post, User} from '../interf';
import {NgForm} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {PostService} from '../service/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  public post = {} as Post;
  selectedFile: File = null;

  constructor(
    private flashMessages: FlashMessagesService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    this.selectedFile = event.target.files[0];
    const fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.postService.addImage(fd);
    this.post.titleImage = ('http://localhost:3000/image/' + this.selectedFile.name);
  }

  addPost(form: NgForm){
    if (form.valid) {
      this.postService.addPost(this.post).subscribe();
      this.router.navigate(['/home']);
    }
    else if (!form.valid){
      this.flashMessages.show('Поля не заповнені', {
          cssClass: 'alert-danger',
          timeout: 3000
        }
      );
      return;
    }
  }

  cancel(){
    return this.router.navigate(['/home']);
  }

}
