import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import {Skill} from '../../interface/kills-interface/kills-interface';
import {KillsServices} from '../../core/services/kills-services/kills-services';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Propiedades del componente
  skills: Skill[] = [];
  technicalSkills: Skill[] = [];
  otherSkills: Skill[] = [];
  isLoading = true;
  animatedItems = new Set<number>();

  constructor(
    private readonly skillsService: KillsServices
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Carga las habilidades desde el servicio
  private loadSkills(): void {
    this.skillsService.getSkills()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (skills: Skill[]) => {
          this.skills = skills;
          this.technicalSkills = skills.filter(skill => skill.category !== 'other');
          this.otherSkills = skills.filter(skill => skill.category === 'other');
          this.isLoading = false;
          this.startStaggeredAnimation();
        },
        error: (e: HttpErrorResponse) => {
          console.error('Error en la descarga de hanilidades:', e);
          this.isLoading = false;
        }
      });
  }

  // Animación escalonada para cada skill
  private startStaggeredAnimation(): void {
    this.skills.forEach((skill, index) => {
      setTimeout(() => {
        this.animatedItems.add(skill.id);
      }, index * 200); // 200ms entre cada animación
    });
  }

  // Verifica si un item debe estar animado
  isAnimated(skillId: number): boolean {
    return this.animatedItems.has(skillId);
  }

  // Método helper para el trackBy de @for
  trackBySkillId(index: number, skill: Skill): number {
    return skill.id;
  }

  // Helper para obtener el color del nivel
  getLevelColor(level: Skill['level']): string {
    const colors = {
      'learning': '#fbbf24',
      'beginner': '#34d399',
      'intermediate': '#60a5fa',
      'advanced': '#a78bfa'
    };
    return colors[level];
  }

  // Helper para obtener el texto del nivel en español
  getLevelText(level: Skill['level']): string {
    const texts = {
      'learning': 'Aprendiendo',
      'beginner': 'Principiante',
      'intermediate': 'Intermedio',
      'advanced': 'Avanzado'
    };
    return texts[level];
  }
}
