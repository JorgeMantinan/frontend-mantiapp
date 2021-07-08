import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OwnershipComponent } from './ownership/ownership.component';
import { CarouselComponent } from './carousel/carousel.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

/* Angular Material */
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FooterComponent } from './footer/footer.component';
import { OwnerComponent } from './owner/owner.component';

/* Services */
import { OwnerService } from './owner/owner.service';
 
const routes: Routes = [
  {path: '', redirectTo: '/ownership', pathMatch: 'full'},
  {path: 'ownership', component: OwnershipComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OwnershipComponent,
    CarouselComponent,
    FooterComponent,
    OwnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCarouselModule.forRoot()
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
