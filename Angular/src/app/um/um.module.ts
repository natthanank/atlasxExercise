import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UmRoutingModule } from './um-routing.module';
import { UmComponent } from './um.component';

@NgModule({
  imports: [
    CommonModule,
    UmRoutingModule
  ],
  declarations: [UmComponent]
})
export class UmModule { }
