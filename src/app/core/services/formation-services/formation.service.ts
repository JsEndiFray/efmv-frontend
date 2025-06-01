import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Formation} from '../../../interface/formation-interface/formation-interface';
import {formationData} from '../../data/formation-data';


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  // Obtiene toda la formación ordenada por año (más reciente primero)
  getFormations(): Observable<Formation[]> {
    const sortedFormations = [...formationData].sort((a, b) => b.year - a.year);
    return of(sortedFormations);
  }

}
