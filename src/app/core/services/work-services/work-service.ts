import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {WorkExperience} from '../../../interface/work-interface/work-.interface';
import {workExperienceData} from '../../data/work-data';


@Injectable({
  providedIn: 'root'
})
export class WorkService {

  // Obtiene toda la experiencia laboral ordenada por fecha (más reciente primero)
  getWorkExperience(): Observable<WorkExperience[]> {
    const sortedExperience = [...workExperienceData].sort((a, b) => {
      // Priorizar trabajo actual
      if (a.isCurrentJob) return -1;
      if (b.isCurrentJob) return 1;

      // Luego ordenar por ID (que representa cronología)
      return a.id - b.id;
    });
    return of(sortedExperience);
  }

  // Obtiene experiencia por categoría
  getExperienceByCategory(category: WorkExperience['category']): Observable<WorkExperience[]> {
    const filteredExperience = workExperienceData.filter(exp => exp.category === category);
    return of(filteredExperience);
  }

  // Obtiene el trabajo actual
  getCurrentJob(): Observable<WorkExperience | undefined> {
    const currentJob = workExperienceData.find(exp => exp.isCurrentJob);
    return of(currentJob);
  }

  // Obtiene experiencia por años de trabajo
  getExperienceByYears(): Observable<{ [year: string]: WorkExperience[] }> {
    const groupedByYear = workExperienceData.reduce((acc, exp) => {
      const year = exp.startDate.split(' ').pop() || ''; // Extrae el año
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(exp);
      return acc;
    }, {} as { [year: string]: WorkExperience[] });

    return of(groupedByYear);
  }

  // Obtiene estadísticas de experiencia
  getExperienceStats(): Observable<{
    totalJobs: number;
    yearsOfExperience: number;
    categoriesWorked: string[];
    longestJob: WorkExperience;
  }> {
    const totalJobs = workExperienceData.length;
    const categoriesWorked = [...new Set(workExperienceData.map(exp => exp.category))];
    const longestJob = workExperienceData.reduce((longest, current) => {
      // Calcular duración aproximada (esto es simplificado)
      return longest.duration.length > current.duration.length ? longest : current;
    });

    const stats = {
      totalJobs,
      yearsOfExperience: 23, // Desde 2001 hasta 2024
      categoriesWorked,
      longestJob
    };

    return of(stats);
  }

  // Obtiene experiencia por ID
  getExperienceById(id: number): Observable<WorkExperience | undefined> {
    const experience = workExperienceData.find(exp => exp.id === id);
    return of(experience);
  }

}
