import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Formation } from '../../interface/formation-interface/formation-interface';
import {FormationService} from '../../core/services/formation-services/formation.service';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Propiedades del componente
  formations: Formation[] = [];
  isLoading = true;

  constructor(
    private readonly formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Carga la formación desde el servicio
  private loadFormations(): void {
    this.formationService.getFormations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formations: Formation[]) => {
          this.formations = formations;
          this.isLoading = false;
        },
        error: (e: HttpErrorResponse) => {
          console.error('Error en la descarga de formación:', e);
          this.isLoading = false;
        }
      });
  }

  // Método helper para el trackBy de @for
  trackByFormationId(index: number, formation: Formation): number {
    return formation.id;
  }
}
