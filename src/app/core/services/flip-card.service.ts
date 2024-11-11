import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlipCardService {
//creo un BehaviorSubject que almacenará el estado de las tarjetas (volteadas o no)
  private flippedCardsSubject = new BehaviorSubject<boolean[]>([])
  //la dejo pendiente por si la utiliza con ractividad
  flippedCards$ = this.flippedCardsSubject.asObservable();

  constructor() {
  }

//metodo para inicializar el estado de las tarjetas
  initializedCards(numberOfCards: number) {
    //creo un arreglo de booleanos con el tamaño especificado, todos inicializados en false
    const initialStates = Array(numberOfCards).fill(false);
    //emito el estado inicial a los suscriptores del BehaviorSubject
    this.flippedCardsSubject.next(initialStates)
  }

  //metodo para voltear una tarjeta en un índice específico
  flipCard(index: number) {
    //obtengo el estado actual de las tarjetas
    const currenStates = this.flippedCardsSubject.value;
    //cambio el estado de la tarjeta en el índice especificado (de true a false o viceversa)
    currenStates[index] = !currenStates[index];
    //emitir el nuevo estado actualizado
    this.flippedCardsSubject.next(currenStates);
    //si la tarjeta se ha volteado, volvemos a ponerla en su estado original tras 5 segundos
    if (currenStates[index]) {
      setTimeout(() => {
        currenStates[index] = false;
        //emitir el nuevo estado actualizado
        this.flippedCardsSubject.next(currenStates);
      }, 60000)

    }
  }

//metodo para verificar si una tarjeta está volteadas
  isCardFlipped(index: number): boolean {
    //retorno el estado de la tarjeta en el índice especificado
    return this.flippedCardsSubject.value[index];

  }

}
