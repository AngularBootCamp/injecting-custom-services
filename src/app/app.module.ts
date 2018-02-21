import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeLoaderService } from './employee-loader.service';

import { AppComponent }  from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [EmployeeLoaderService], // Make loader service available to app
  bootstrap: [AppComponent]
})
export class AppModule { }
