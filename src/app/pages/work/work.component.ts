import { Component, OnDestroy, OnInit, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import {WorkExperience} from '../../interface/work-interface/work-.interface';
import {WorkService} from '../../core/services/work-services/work-service';
import {HttpErrorResponse} from '@angular/common/http';
import {CvService} from '../../core/services/cv-service/cv.service';
import {DownloadOptions} from '../../interface/cv-interface/cv-interface';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly platformId = inject(PLATFORM_ID);
  private readonly MOBILE_BREAKPOINT = 768;


  // Propiedades del componente
  workExperience: WorkExperience[] = [];
  experienceStats: {
    totalJobs: number;
    yearsOfExperience: number;
    categoriesWorked: string[];
    longestJob: WorkExperience | null;
  } = { totalJobs: 0, yearsOfExperience: 0, categoriesWorked: [], longestJob: null };
  isLoading = true;
  isMobile = false;
  isDownloading = false;

  // Estado para las tarjetas expandibles
  expandedCards = new Set<number>();

  constructor(
    private readonly workService: WorkService,
    private readonly cvService: CvService
  ) {
    this.initializeMobileDetection();
  }

  ngOnInit(): void {
    this.loadWorkExperience();
    this.loadExperienceStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Detecta cambios en el tamaño de la ventana
  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
    }
  }

  // Carga la experiencia laboral desde el servicio
  private loadWorkExperience(): void {
    this.workService.getWorkExperience()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (experience: WorkExperience[]) => {
          this.workExperience = experience;
          this.isLoading = false;
        },
        error: (e: HttpErrorResponse) => {
          console.error('Error de carga de la experiencia laboral:', e);
          this.isLoading = false;
        }
      });
  }

  // Carga las estadísticas de experiencia
  private loadExperienceStats(): void {
    this.workService.getExperienceStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.experienceStats = stats;
        },
        error: (e: HttpErrorResponse) => {
          console.error('Error al cargar las estadísticas de experiencia:', e);
        }
      });
  }

  // Inicializa la detección de móvil de forma segura
  private initializeMobileDetection(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
    }
  }

  // Expande o colapsa una tarjeta
  toggleCard(experience: WorkExperience): void {
    const cardId = experience.id;

    if (this.expandedCards.has(cardId)) {
      this.expandedCards.delete(cardId);
    } else {
      this.expandedCards.add(cardId);
    }
  }

  // Verifica si una tarjeta está expandida
  isCardExpanded(experience: WorkExperience): boolean {
    return this.expandedCards.has(experience.id);
  }

  // Método helper para el trackBy de @for
  trackByExperienceId(index: number, experience: WorkExperience): number {
    return experience.id;
  }

  // Helper para obtener el color de la categoría
  getCategoryColor(category: WorkExperience['category']): string {
    const colors = {
      'sales': '#3b82f6',
      'hospitality': '#f59e0b',
      'logistics': '#10b981',
      'management': '#8b5cf6',
      'cleaning': '#06b6d4',
      'promotion': '#ef4444'
    };
    return colors[category] || '#6b7280';
  }

  // Helper para obtener el texto de la categoría
  getCategoryText(category: WorkExperience['category']): string {
    const texts = {
      'sales': 'Ventas',
      'hospitality': 'Hostelería',
      'logistics': 'Logística',
      'management': 'Gestión',
      'cleaning': 'Limpieza',
      'promotion': 'Promoción'
    };
    return texts[category] || category;
  }

  async downloadCV(): Promise<void> {
    this.isDownloading = true;
    try {
      const options: Partial<DownloadOptions> = {
        filename: 'CV-Endi-Fray-Medranda.pdf',
        showProgress: true
      };
      await this.cvService.downloadCV(options);
    } catch (error: unknown) {
      if (!environment.production) {
        console.error('❌ Error al descargar CV:', error);
      }
    } finally {
      this.isDownloading = false;
    }
  }


}
