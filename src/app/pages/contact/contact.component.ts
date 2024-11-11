import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ContactInterface} from '../../core/interface/contact.interface';
import Swal from 'sweetalert2';
import {ContactApiService} from '../../core/services/contact-api.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',

})
export class ContactComponent {
  email: String = 'endifraymv@gmail.com'

  constructor(private _ContactApiService: ContactApiService,
              private router: Router) {
  }

//requiere que sean el interface del mensaje
  contacts: ContactInterface = {
    name: '',
    email: '',
    message: ''
  }

//metodo para que el mensaje enviado este relleno correctamente
  sendMessage() {
    if (this.contacts.name === '' || this.contacts.email === '' || this.contacts.message === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal!',
        footer: 'Revisa que todos los apartados esten correctamente rellenos ',
      });
      return;
    }
    //validamos que el correo esta correctamente
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.contacts.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Revisa que el correo este correctamente',
      });
      return;
    }
    //conexcion con la bbdd
    this._ContactApiService.sendMessage(this.contacts).subscribe({
      next: (v) => {
        Swal.fire({
          icon: "success",
          title: 'El mensaje  se ha enviado correctamente',
          confirmButtonText: 'Ok'
        }).then(() => {
          //reset
          this.contacts = {
            name: '',
            email: '',
            message: ''
          }
        })
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar el mensaje. Intentelo de nuevo màs tarde.",
        })
      }
    })
  }
}
