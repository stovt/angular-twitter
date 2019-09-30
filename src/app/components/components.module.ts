import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { LoadingErrorHandlerComponent } from './loading-error-handler/loading-error-handler.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RetryButtonComponent } from './retry-button/retry-button.component';
import { TweetFormComponent } from './tweet-form/tweet-form.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    NavigationComponent,
    CommentComponent,
    CommentFormComponent,
    CommentsComponent,
    TweetComponent,
    TweetFormComponent,
    LoadingErrorHandlerComponent,
    RetryButtonComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavigationComponent,
    CommentComponent,
    CommentFormComponent,
    CommentsComponent,
    TweetComponent,
    TweetFormComponent,
    LoadingErrorHandlerComponent,
    RetryButtonComponent
  ]
})
export class ComponentsModule {}
