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
import {DifucionComponent} from './difucion/difucion.component'

/*Se crea una constante*/
const appRoutes: Routes = [
  {path: '', component: SectionComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'ofertas', component: OfertaComponent},
  {path: 'comunicacion', component: ComunicacionComponent},
  {path: 'contabilidad', component: ContabilidadComponent},
  {path: 'difucion', component: DifucionComponent},
 
 
 
  {path: '**', component: NotfoundComponent},
 

];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

