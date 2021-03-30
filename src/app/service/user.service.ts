import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User} from '../interf';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private Url = 'http://localhost:3000/auth/user';

  constructor(
    private readonly http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  register(user: User) {
    const url = this.Url + '/register';
    return this.http.post(url, user, this.httpOptions).pipe();
  }

  login(userlogin: User) {
    const url = this.Url + '/login';

    return this.http.post(url, userlogin).pipe();
  }
}
