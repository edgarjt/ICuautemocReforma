import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProvider} from './app.routing';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavComponent } from './nav/nav.component';
import { SliderComponent } from './slider/slider.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './footer/footer.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { OfertaComponent } from './oferta/oferta.component';
import { NotfoundComponent } from './notfound/notfound.component'







@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SliderComponent,
    SectionComponent,
    FooterComponent,
    CarrerasComponent,
    NosotrosComponent,
    OfertaComponent,
    NotfoundComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing


  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
