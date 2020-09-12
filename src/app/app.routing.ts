import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
/*IMPORTA COMPONENT*/
import {SidebarComponent} from './sidebar/sidebar.component';
import {UsersComponent} from './users/users.component';
import {MateriasComponent} from './materias/materias.component';
import {SemestresComponent} from './semestres/semestres.component';
import {CarrerasComponent} from './carreras/carreras.component';
import {PlanEstudiosComponent} from './plan-estudios/plan-estudios.component';
import {AdminWebComponent} from './admin-web/admin-web.component';

const appRoutes: Routes = [
  {path: '', component: SidebarComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'materias', component: MateriasComponent},
      {path: 'semestres', component: SemestresComponent},
      {path: 'carreras', component: CarrerasComponent},
      {path: 'plan_estudios', component: PlanEstudiosComponent},
      {path: 'admin_web', component: AdminWebComponent}
    ]
  }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
