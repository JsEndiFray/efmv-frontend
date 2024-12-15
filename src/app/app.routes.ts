import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FormationComponent} from './pages/formation/formation.component';
import {SkillsComponent} from './pages/skills/skills.component';
import {WorkComponent} from './pages/work/work.component';
import {ContactComponent} from './pages/contact/contact.component';
import {ProjectComponent} from './pages/project/project.component';


export const routes: Routes = [

  {
    path:'dashboard',
    component: DashboardComponent,
    title:'Carta Presentación'
  },
  {
    path:'formation',
    component: FormationComponent,
    title:'Formación'
  },
  {
    path:'skills',
    component: SkillsComponent,
    title:'Habilidades'
  },
  {
    path:'work',
    component: WorkComponent,
    title:'Experiencia Laboral'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title:'Contacto'
  },
  {
    path: 'project',
    component: ProjectComponent,
    title: 'Proyectos'
  },
  {
    path:'project-map',
    loadComponent: ()=> import('./core/project-map/project-map.component').then(m => m.ProjectMapComponent)
  },

  {
    path:'**',
    redirectTo:'dashboard',
    pathMatch:'full'
  }

];
