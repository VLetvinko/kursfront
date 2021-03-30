import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {User} from '../interf';
import {NgForm} from '@angular/forms';
import {UserService} from '../service/user.service';
import {TokenStorageService} from '../service/token-storage.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  public user = {} as User;

  constructor(
    private testService: UserService,
    private flashMessages: FlashMessagesService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmitLogin(form: NgForm): void {
    if (form.valid) {
      this.testService.login(this.user).subscribe(data => {
          // @ts-ignore
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
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

  reloadPage(): void {
    window.location.reload();
  }
}
