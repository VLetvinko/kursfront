import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegComponent} from './reg/reg.component';
import {LoginComponent} from './login/login.component';
import {FlashMessagesService} from 'angular2-flash-messages';
import {PostsComponent} from './posts/posts.component';
import {FullPostComponent} from './full-post/full-post.component';
import {AddPostComponent} from './add-post/add-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegComponent },
  { path: 'home', component: PostsComponent },
  { path: 'fullpost/:id', component: FullPostComponent },
  { path: 'addpost', component: AddPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
