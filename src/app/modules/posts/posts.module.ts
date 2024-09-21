import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PostsPageComponent } from './components/posts-page/posts-page.component';

@NgModule({
  declarations: [PostsPageComponent],
  imports: [CardModule, ButtonModule, CommonModule],
})
export class PostsModule {}
