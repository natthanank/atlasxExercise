import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { SwitcherComponent } from './switcher/switcher.component';
import { AppService } from './app.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    SwitcherComponent
  ],
  providers: [AppService]
})
export class AppBaseModule { }
