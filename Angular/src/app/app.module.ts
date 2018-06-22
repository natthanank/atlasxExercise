import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppBaseModule } from './app-base/app-base.module';

import { GisModule } from './gis/gis.module';
import { UmModule } from './um/um.module';
import { LatLongComponent } from './lat-long/lat-long.component';


@NgModule({
  declarations: [
    AppComponent,
    LatLongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBaseModule,
    GisModule,
    UmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
