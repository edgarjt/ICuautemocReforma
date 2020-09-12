import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { MateriasComponent } from './materias/materias.component';
import { SemestresComponent } from './semestres/semestres.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { PlanEstudiosComponent } from './plan-estudios/plan-estudios.component';
import { AdminWebComponent } from './admin-web/admin-web.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    WrapperComponent,
    ControlSidebarComponent,
    FooterComponent,
    UsersComponent,
    MateriasComponent,
    SemestresComponent,
    CarrerasComponent,
    PlanEstudiosComponent,
    AdminWebComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
