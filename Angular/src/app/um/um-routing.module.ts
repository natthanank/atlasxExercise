import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UmComponent } from './um.component';
import { AuthGuardService } from '../app-base/auth-guard.service';

const UM_ROUTES: Routes = [
  {
    path: 'um',
    component: UmComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(UM_ROUTES)
  ],
  exports: [RouterModule]
})
export class UmRoutingModule { }
