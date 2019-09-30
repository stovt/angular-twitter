import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ComponentsModule],
  exports: [LoginFormComponent]
})
export class LoginPageModule {}
