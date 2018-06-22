import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './app-base/auth-guard.service';
import { SwitcherComponent } from './app-base/switcher/switcher.component';


const APP_ROUTES: Routes = [
  {
    path: '',
    component: SwitcherComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
