import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatTableModule} from '@angular/material/table';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MoonsunComponent } from './moonsun/moonsun.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    MoonsunComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgxChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
