import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageModule } from './login-page/login-page.module';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterPageModule } from './register-page/register-page.module';
import { TweetsPageComponent } from './tweets-page/tweets-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LogoutPageComponent,
    TweetsPageComponent,
    UserPageComponent,
    UsersPageComponent
  ],
  imports: [CommonModule, ComponentsModule, LoginPageModule, RegisterPageModule],
  exports: [HomePageComponent, LoginPageComponent]
})
export class PagesModule {}
