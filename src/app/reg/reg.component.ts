import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../interf';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AddPostComponent} from '../add-post/add-post.component';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent  {

  public user = {} as User;

  constructor(
    private userService: UserService,
    private flashMessages: FlashMessagesService,
    private router: Router,
  ) { }

  onSubmitReg(form: NgForm) {
    if (form.valid) {
      this.userService.register(this.user).subscribe();
      this.router.navigate(['/home']);
    }
    else if (!form.valid){
      this.flashMessages.show('Поля не заповнені', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return;
    }
  }

  cancel(){
    return this.router.navigate(['/home']);
  }
}
