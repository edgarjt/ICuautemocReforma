/*Se importan los routing*/
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/*Se importan los componentes*/
import {SectionComponent} from './section/section.component';
import {NosotrosComponent} from './nosotros/nosotros.component';
import {OfertaComponent} from './oferta/oferta.component';
import {NotfoundComponent} from './notfound/notfound.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import {ContabilidadComponent} from './contabilidad/contabilidad.component';
import {DifucionComponent} from './difucion/difucion.component';
import {ContactoComponent} from './contacto/contacto.component';
import {IndustrialPetroleroComponent} from './industrial-petrolero/industrial-petrolero.component';
import {PlanEstudioComponent } from  './plan-estudio/plan-estudio.component';
import {EnfermeriaComponent} from './enfermeria/enfermeria.component';
import {LogisticaComponent} from './logistica/logistica.component';
import {TrabajoSocialComponent} from './trabajo-social/trabajo-social.component';
import {AdministracionRhComponent} from './administracion-rh/administracion-rh.component';



/*Se crea una constante*/
const appRoutes: Routes = [
  {path: '', component: SectionComponent},
  {path: 'home', component: SectionComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'ofertas', component: OfertaComponent},
  {path: 'comunicacion', component: ComunicacionComponent},
  {path: 'contabilidad', component: ContabilidadComponent},
  {path: 'difucion', component: DifucionComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'industrial_petrolero', component: IndustrialPetroleroComponent},
  {path: 'plan_estudio', component: PlanEstudioComponent },
  {path: 'enfermeria', component: EnfermeriaComponent },
  {path: 'logistica', component: LogisticaComponent} ,
  {path: 'trabajosocial', component:  TrabajoSocialComponent } ,
  {path: 'administracion', component:  AdministracionRhComponent} ,


  {path: '**', component: NotfoundComponent},


];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

