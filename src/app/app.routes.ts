import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FormationComponent} from './pages/formation/formation.component';
import {SkillsComponent} from './pages/skills/skills.component';
import {WorkComponent} from './pages/work/work.component';
import {ContactComponent} from './pages/contact/contact.component';

export const routes: Routes = [

  {
    path:'dashboard',
    component: DashboardComponent,
    title:'Carta Presentacion'
  },
  {
    path:'formation',
    component: FormationComponent,
    title:'Formacion'
  },
  {
    path:'skills',
    component: SkillsComponent,
    title:'Habilidades'
  },
  {
    path:'work',
    component: WorkComponent,
    title:'Experiencia laboral'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title:'Contacto'
  },

  {
    path:'**',
    redirectTo:'dashboard',
    pathMatch:'full'
  }

];
