import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxDataGridModule } from 'devextreme-angular';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DashboardService } from './component/dashboard/dashboard.service';
import { DetailsComponent } from './component/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DxDataGridModule,
    HttpClientModule

  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
