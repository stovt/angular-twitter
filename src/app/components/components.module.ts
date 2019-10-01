import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentIconComponent } from './icons/comment-icon/comment-icon.component';
import { IconWrapperComponent } from './icons/icon-wrapper/icon-wrapper.component';
import { LikeIconComponent } from './icons/like-icon/like-icon.component';
import { TrashIconComponent } from './icons/trash-icon/trash-icon.component';
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
    RetryButtonComponent,
    TrashIconComponent,
    IconWrapperComponent,
    LikeIconComponent,
    CommentIconComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    NavigationComponent,
    CommentComponent,
    CommentFormComponent,
    CommentsComponent,
    TweetComponent,
    TweetFormComponent,
    LoadingErrorHandlerComponent,
    RetryButtonComponent,
    TrashIconComponent,
    IconWrapperComponent,
    LikeIconComponent,
    CommentIconComponent
  ]
})
export class ComponentsModule {}
