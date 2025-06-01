import {Component, OnDestroy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import Swal from 'sweetalert2';

import {ContactApiService} from '../../core/services/contact-services/contact-service';
import {ContactForm} from '../../interface/contac-interface/contact-interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  // Propiedades del componente
  readonly email = 'endifray@efmv.es';
  isSubmitting = false;

  // Modelo del formulario
  contacts: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(
    private readonly contactApiService: ContactApiService
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Envía el mensaje de contacto
  sendMessage(): void {
    if (this.isSubmitting) return;

    // Validar formulario usando el servicio
    const validationErrors = this.contactApiService.validateForm(this.contacts);
    if (validationErrors.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: validationErrors.join(', '),
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }
    this.isSubmitting = true;

    this.contactApiService.sendEmail(this.contacts)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarme. Te responderé en las próximas 24 horas.',
            confirmButtonText: 'Perfecto',
            confirmButtonColor: '#667eea',
            timer: 4000,
            timerProgressBar: true
          }).then(() => {
            this.contacts = {
              name: '',
              email: '',
              phone: '',
              message: ''
            };
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error sending message:', error);

          const userMessage = error.message || 'Error al enviar el mensaje. Inténtalo de nuevo.';
          Swal.fire({
            icon: 'error',
            title: 'No se pudo enviar',
            text: userMessage,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ef4444'
          });
        }
      });
  }
}
