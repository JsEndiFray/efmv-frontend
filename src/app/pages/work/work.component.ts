import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {FlipCardService} from '../../core/services/flip-card.service';
import {CardsInterface} from '../../core/interface/cards.interface';
import {cardsData} from '../../core/data/cards-data';


@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent implements OnInit {
//esta en un archivo ts de data
  cards: CardsInterface[] = cardsData;

  // el manejo para las tarjetas que voltean
  flippedCards: boolean[] = [];

  // Variable para detectar si estamos en una pantalla móvil
  isMobile: boolean = false;

  constructor(private _FlipCardService: FlipCardService,) {
  }

  ngOnInit(): void {
    this.checkIfMobile()
    this._FlipCardService.initializedCards(this.cards.length);
    //suscribirse a los cambios en el estado de las tarjetas
    this._FlipCardService.flippedCards$.subscribe(state => {
      this.flippedCards = state;
    })
    //Fuerza el estado "back" en todas las tarjetas si estamos en móvil al iniciar
    if (this.isMobile) {
      this.flippedCards = Array(this.cards.length).fill(true);
    }
  }

  //metodo para voltear una tarjeta en un índice específico
  flip(index: number) {
    if (!this.isMobile) {  //Solo permite el giro si no estamos en un dispositivo móvil
      this._FlipCardService.flipCard(index);
    }

  }

//metodo para verificar si una tarjeta está volteadas
  isFlipped(index: number) {
    return this._FlipCardService.isCardFlipped(index) || this.isMobile;
  }

//Escucha el cambio de tamaño de la ventana para actualizar el estado de `isMobile`
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile();
  }

  //metodo para verificar si estamos en una pantalla móvil
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 800;//Ajusta este valor según el tamaño que consideres "móvil"
    //si estamos en una pantalla móvil, voltea todas las tarjetas
    if (this.isMobile) {
      this.flippedCards = Array(this.cards.length).fill(true);
    }
  }

}
