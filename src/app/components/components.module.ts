import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TweetFormComponent } from './tweet-form/tweet-form.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    NavigationComponent,
    CommentComponent,
    CommentFormComponent,
    CommentsComponent,
    TweetComponent,
    TweetFormComponent
  ],
  imports: [RouterModule],
  exports: [NavigationComponent]
})
export class ComponentsModule {}
