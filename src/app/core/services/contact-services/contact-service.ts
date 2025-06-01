import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiServices } from '../api-services/api-services';

import {ContactForm, ContactResponse} from '../../../interface/contac-interface/contact-interface';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private readonly contactEndpoint: string;

  constructor(private readonly apiService: ApiServices) {
    // Limpiar endpoint quitando la barra inicial si existe
    this.contactEndpoint = environment.contactEndpoint
      ? environment.contactEndpoint.substring(1)
      : environment.contactEndpoint;

  }

  /**
   * Envía un email de contacto
   * @param contact - Datos del formulario de contacto
   * @returns Observable con la respuesta del servidor
   */
  sendEmail(contact: ContactForm): Observable<ContactResponse> {
    // Limpiar datos antes de enviar
    const cleanContact: ContactForm = {
      name: contact.name.trim(),
      email: contact.email.trim().toLowerCase(),
      phone: contact.phone?.trim() || '',
      message: contact.message.trim()
    };

    return this.apiService.post<ContactForm, ContactResponse>(this.contactEndpoint, cleanContact).pipe(
      map(response => {
        return response;
      })
    );
  }
  /**
   * Valida los datos del formulario antes de enviar el email
   * @param contact - Datos a validar
   * @returns Array de errores (vacío si es válido)
   */
  validateForm(contact: ContactForm): string[] {
    const errors: string[] = [];

    // Validar nombre
    if (!contact.name?.trim() || contact.name.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email?.trim() || !emailRegex.test(contact.email.trim())) {
      errors.push('Ingresa un email válido');
    }

    // Validar mensaje
    if (!contact.message?.trim() || contact.message.trim().length < 10) {
      errors.push('El mensaje debe tener al menos 10 caracteres');
    }

    // Validar teléfono (opcional)
    if (contact.phone?.trim()) {
      const phoneRegex = /^[+]?[\d\s\-\(\)]*$/;
      if (!phoneRegex.test(contact.phone.trim())) {
        errors.push('Formato de teléfono inválido');
      }
    }

    return errors;
  }
}
