import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './modules/users/components/user-page/user-page.component';
import { PostsPageComponent } from './modules/posts/components/posts-page/posts-page.component';
import { HomePageComponent } from './modules/home/components/home-page/home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent }, // Default route
  { path: 'users', component: UserPageComponent },
  { path: 'posts', component: PostsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
