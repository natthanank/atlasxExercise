import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GisComponent } from './gis.component';
import { AuthGuardService } from '../app-base/auth-guard.service';

const GIS_ROUTES: Routes = [
  {
    path: 'gis',
    component: GisComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(GIS_ROUTES)
  ],
  exports: [RouterModule]
})
export class GisRoutingModule { }
