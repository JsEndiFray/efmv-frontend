import { Component, HostListener, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  // Constantes de configuración
  private readonly MOBILE_BREAKPOINT = 800;
  private readonly SCROLL_THRESHOLD = 0;

  // Estados del componente
  scrolled = false;
  activeItem = '';
  menuOpen = false;
  isMobileView = false;

  constructor() {
    this.initializeMobileView();
    this.subscribeToRouteChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Detecta cambios en el scroll de la ventana
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > this.SCROLL_THRESHOLD;
    }
  }

  // Detecta cambios en el tamaño de la ventana
  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const wasMobile = this.isMobileView;
      this.isMobileView = window.innerWidth <= this.MOBILE_BREAKPOINT;

      // Cierra el menú si cambia de móvil a desktop
      if (wasMobile && !this.isMobileView) {
        this.menuOpen = false;
      }
    }
  }

  // Alterna el estado del menú móvil
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Establece el elemento activo y cierra el menú móvil
  setActive(item: string): void {
    this.activeItem = item;
    if (this.isMobileView) {
      this.menuOpen = false;
    }
  }

  // Inicializa la detección de vista móvil de forma segura
  private initializeMobileView(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= this.MOBILE_BREAKPOINT;
    }
  }

  // Suscribe a cambios de ruta para actualizar elemento activo
  private subscribeToRouteChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateActiveItemFromRoute(event.url);
      });
  }

  // Actualiza el elemento activo basado en la ruta actual
  private updateActiveItemFromRoute(url: string): void {
    const routeMap: Record<string, string> = {
      '/dashboard': 'dashboard',
      '/formation': 'formation',
      '/skills': 'skills',
      '/work': 'work',
      '/project': 'project',
      '/contact': 'contact'
    };

    // Busca coincidencia exacta o parcial de la ruta
    const matchedRoute = Object.keys(routeMap).find(route =>
      url === route || url.startsWith(route + '/')
    );

    this.activeItem = matchedRoute ? routeMap[matchedRoute] : '';
  }
}
