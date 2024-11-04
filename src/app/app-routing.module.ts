import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './modules/users/components/user-page/user-page.component';
import { PostsPageComponent } from './modules/posts/components/posts-page/posts-page.component';
import { HomePageComponent } from './modules/home/components/home-page/home-page.component';
import { authGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent }, // Default route
  { path: 'users', component: UserPageComponent, canActivate: [authGuard] },
  { path: 'posts', component: PostsPageComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
