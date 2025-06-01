import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorHandlerService} from '../../error-handler/error-handler.service';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Realiza una petición POST (único método necesario para emails)
   * @param endpoint - Endpoint relativo (ej: 'api/contact')
   * @param data - Datos del email a enviar
   * @returns Observable con la respuesta
   */
  post<T, R = T>(endpoint: string, data: T): Observable<R> {
    const fullUrl = `${this.apiUrl}/${endpoint}`;
    return this.http.post<R>(fullUrl, data).pipe(
      map(response => {
        return response;
      }),
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
