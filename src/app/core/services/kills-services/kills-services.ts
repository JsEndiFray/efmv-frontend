import {Injectable} from '@angular/core';
import {Skill} from '../../../interface/kills-interface/kills-interface';
import {Observable, of} from 'rxjs';
import {skillsData} from '../../data/kills-data';

@Injectable({
  providedIn: 'root'
})
export class KillsServices {

  constructor() {
  }

  // Obtiene todas las habilidades
  getSkills(): Observable<Skill[]> {
    return of(skillsData);
  }


}
