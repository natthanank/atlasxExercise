import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GisRoutingModule } from './gis-routing.module';
import { GisComponent } from './gis.component';
import { GisService } from './gis.service';
import { EsriConfigService } from './services/esri-config.service';
import { GeometryUtilService } from './services/geometry-util.service';
import { ProjectionUtilService } from './services/projection-util.service';

@NgModule({
  imports: [
    CommonModule,
    GisRoutingModule
  ],
  declarations: [
    GisComponent
  ],
  providers: [
    GisService,
    EsriConfigService,
    GeometryUtilService,
    ProjectionUtilService
  ]
})
export class GisModule { }