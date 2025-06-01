import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {}

  /**
   * Maneja errores HTTP específicos para el envío de emails
   * @param error - Error HTTP recibido
   * @returns Observable con error formateado
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error al enviar email:', error);

    let errorMessage = 'Error al enviar el mensaje';

    if (error.error instanceof ErrorEvent) {
      // Error de conexión/red
      errorMessage = 'Sin conexión a internet. Verifica tu conexión.';
    } else {
      // Errores del servidor
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Datos del formulario inválidos.';
          break;
        case 500:
          errorMessage = 'Error del servidor. Inténtalo más tarde.';
          break;
        case 0:
          errorMessage = 'No se puede conectar al servidor. Verifica tu conexión.';
          break;
        default:
          errorMessage = error.error?.message || 'Error al enviar el mensaje.';
      }
    }

    console.error('🔍 Error Details:', {
      message: errorMessage,
      status: error.status,
      timestamp: new Date().toISOString()
    });

    return throwError(() => new Error(errorMessage));
  }
}
