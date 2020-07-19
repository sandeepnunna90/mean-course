import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
