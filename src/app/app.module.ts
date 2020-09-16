import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';

/*Service*/
import {UsersService} from './services/users.service';
import {CarrerasService} from './services/carreras.service';
import {MateriasService} from './services/materias.service';
import {PlanService} from './services/plan.service';
import {SemestresService} from './services/semestres.service';

/*components*/
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
import { EditUserComponent } from './edit-user/edit-user.component';
import { PreviewPdfComponent } from './preview-pdf/preview-pdf.component';
import { EditMateriaComponent } from './edit-materia/edit-materia.component';
import { EditSemestreComponent } from './edit-semestre/edit-semestre.component';
import { EditCarreraComponent } from './edit-carrera/edit-carrera.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddMateriaComponent } from './add-materia/add-materia.component';

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
    AdminWebComponent,
    EditUserComponent,
    PreviewPdfComponent,
    EditMateriaComponent,
    EditSemestreComponent,
    EditCarreraComponent,
    AddUserComponent,
    AddMateriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    PdfJsViewerModule
  ],
  providers: [
    appRoutingProviders,
    UsersService,
    CarrerasService,
    MateriasService,
    PlanService,
    SemestresService
  ],
  bootstrap: [AppComponent],

  entryComponents: [
    EditUserComponent,
    PreviewPdfComponent,
    EditMateriaComponent,
    EditSemestreComponent,
    EditCarreraComponent,
    AddUserComponent,
    AddMateriaComponent
  ]
})
export class AppModule { }
