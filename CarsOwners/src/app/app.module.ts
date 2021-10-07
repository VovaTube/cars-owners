import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DataServiseService } from 'src/servises/data-servise.service';
import { CarOwnersComponent } from './components/car-owners/car-owners.component';
import { ApiEndpointService } from 'src/servises/apiEndpoint.service';
import { AddownerComponent } from './components/car-owners/addeditmodal/addowner/addowner.component';

@NgModule({
  declarations: [
    AppComponent,
    CarOwnersComponent,
    AddownerComponent
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(DataServiseService, { delay: 100 }),
    ReactiveFormsModule
  ],
  providers: [ApiEndpointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
