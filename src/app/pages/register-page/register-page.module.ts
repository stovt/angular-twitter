import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ComponentsModule],
  exports: [RegisterFormComponent]
})
export class RegisterPageModule {}
