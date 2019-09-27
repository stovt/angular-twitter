import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageModule } from './login-page/login-page.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterPageModule } from './register-page/register-page.module';

@NgModule({
  declarations: [HomePageComponent, LoginPageComponent, RegisterPageComponent],
  imports: [LoginPageModule, RegisterPageModule],
  exports: [HomePageComponent, LoginPageComponent]
})
export class PagesModule {}
