import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageModule } from './login-page/login-page.module';

@NgModule({
  declarations: [HomePageComponent, LoginPageComponent],
  imports: [LoginPageModule],
  exports: [HomePageComponent, LoginPageComponent]
})
export class PagesModule {}
