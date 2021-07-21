import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormComponent } from './ownership/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnershipComponent } from './ownership/ownership.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DetailComponent } from './ownership/detail/detail.component';
import { LoginComponent } from './owner/login.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

/* Angular Material */
import { MatCarouselModule } from '@ngmodule/material-carousel';

/* Services */
import { OwnerService } from './owner/owner.service';
import { OwnershipService } from './ownership/ownership.service';
 
const routes: Routes = [
  {path: '', redirectTo: '/ownership', pathMatch: 'full'},
  {path: 'ownership', component: OwnershipComponent},
  {path: 'ownership/form', component: FormComponent},
  {path: 'ownership/form/:id', component: FormComponent},
  {path: 'ownership/detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OwnershipComponent,
    CarouselComponent,
    FooterComponent,
    OwnerComponent,
    FormComponent,
    DetailComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCarouselModule.forRoot()
  ],
  providers: [OwnerService, OwnershipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
