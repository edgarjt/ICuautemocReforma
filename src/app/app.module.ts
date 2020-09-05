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
import { NotfoundComponent } from './notfound/notfound.component';
import { IndustrialPetroleroComponent } from './industrial-petrolero/industrial-petrolero.component';
import { EnfermeriaComponent } from './enfermeria/enfermeria.component';
import { LogisticaComponent } from './logistica/logistica.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { TrabajoSocialComponent } from './trabajo-social/trabajo-social.component';
import { AdministracionRhComponent } from './administracion-rh/administracion-rh.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { DifucionComponent } from './difucion/difucion.component';
import { ContactoComponent } from './contacto/contacto.component'







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
    IndustrialPetroleroComponent,
    EnfermeriaComponent,
    LogisticaComponent,
    ContabilidadComponent,
    TrabajoSocialComponent,
    AdministracionRhComponent,
    ComunicacionComponent,
    InscripcionComponent,
    DifucionComponent,
    ContactoComponent,

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
