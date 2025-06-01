import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';
import {CvStatusResponse, DownloadOptions} from '../../../interface/cv-interface/cv-interface';


@Injectable({
  providedIn: 'root'
})
export class CvService {

  private readonly apiUrl: string = environment.apiUrl; // https://api.efmv.es
  private readonly defaultFilename: string = 'CV-Endi-Fray-Medranda.pdf';

  private readonly endpoints = {
    cvDownload: '/api/cv/download',
    cvStatus: '/api/cv/status'
  } as const;

  constructor(private readonly http: HttpClient) {
    this.validateConfiguration();
  }

  /**
   * Descarga el CV directamente - Método principal
   */
  async downloadCV(options: Partial<DownloadOptions> = {}): Promise<void> {
    const filename = options.filename || this.defaultFilename;
    const showProgress = options.showProgress ?? true;

    try {
      if (showProgress) {
        await this.showLoadingAlert('Preparando descarga...', 'Un momento por favor');
      }

      // URL completa: https://api.efmv.es/api/cv/download
      const url = `${this.apiUrl}${this.endpoints.cvDownload}`;

      // Crear enlace temporal
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      // Agregar al DOM temporalmente
      document.body.appendChild(link);

      // Simular click
      link.click();

      // Limpiar
      document.body.removeChild(link);

      console.log('✅ Descarga de CV iniciada desde:', url);

      if (showProgress) {
        setTimeout(async () => {
          await this.showSuccessAlert(
            '¡Descarga iniciada!',
            'El CV debería descargarse automáticamente'
          );
        }, 1000);
      }

    } catch (error) {
      console.error('❌ Error al iniciar descarga de CV:', error);

      await this.showErrorAlert(
        'Error de descarga',
        'No se pudo iniciar la descarga del CV. Por favor, intenta más tarde.',
        'Si el problema persiste, contacta conmigo directamente'
      );

      throw new Error('No se pudo iniciar la descarga del CV');
    }
  }

  /**
   * Método con confirmación antes de descargar
   */
  async downloadCVWithConfirmation(options: Partial<DownloadOptions> = {}): Promise<void> {
    const result: SweetAlertResult = await Swal.fire({
      title: '¿Descargar CV?',
      text: 'Se descargará el currículum en formato PDF',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, descargar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      await this.downloadCV(options);
    }
  }

  /**
   * Verifica el estado del CV
   */
  async checkCVStatus(): Promise<CvStatusResponse> {
    try {
      const url = `${this.apiUrl}${this.endpoints.cvStatus}`;
      const status: CvStatusResponse = await firstValueFrom(
        this.http.get<CvStatusResponse>(url).pipe(
          catchError((error: HttpErrorResponse) => this.handleError(error))
        )
      );

      return status;

    } catch (error) {
      console.error('❌ Error al verificar estado del CV:', error);
      throw error;
    }
  }

  // ==========================================
  // MÉTODOS PRIVADOS - ALERTS
  // ==========================================

  private async showLoadingAlert(title: string, text: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
  }

  private async showSuccessAlert(title: string, text: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: '¡Genial!',
      confirmButtonColor: '#10b981',
      timer: 3000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }

  private async showErrorAlert(
    title: string,
    text: string,
    footer?: string
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#ef4444',
      footer: footer ? `<small>${footer}</small>` : undefined
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = 'Error desconocido';
    let userMessage: string = 'Ocurrió un error inesperado';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      userMessage = 'Error de conexión. Verifica tu internet.';
    } else {
      errorMessage = `Código: ${error.status}, mensaje: ${error.message}`;
      userMessage = this.getServerErrorMessage(error.status);
    }

    console.error('Error en CvService:', errorMessage);
    return throwError(() => new Error(userMessage));
  }

  private getServerErrorMessage(status: number): string {
    const errorMessages: Record<number, string> = {
      0: 'No se puede conectar al servidor',
      404: 'CV no encontrado en el servidor',
      500: 'Error interno del servidor',
      503: 'Servicio temporalmente no disponible'
    };

    return errorMessages[status] || `Error del servidor (${status})`;
  }

  private validateConfiguration(): void {
    if (!this.apiUrl) {
      console.error('❌ API URL no configurada en environment');
      throw new Error('Configuración de API URL faltante');
    }

    // Log de configuración en desarrollo
    if (!environment.production) {
      console.log('🔧 CV Service configurado:', {
        apiUrl: this.apiUrl,
        endpoints: this.endpoints
      });
    }
  }
}
