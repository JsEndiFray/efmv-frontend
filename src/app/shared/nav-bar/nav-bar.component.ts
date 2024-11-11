import {Component, HostListener} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',

})
export class NavBarComponent {
scrolled = false;
activeItem: string ='';

  // Detecta el evento de scroll en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0; // Si hay desplazamiento, cambia el estado de `scrolled`
  }

//sirve al hacer click llama a la funcion y active el evento del menu
  setActive(item: string){
    this.activeItem = item;
  }


}
