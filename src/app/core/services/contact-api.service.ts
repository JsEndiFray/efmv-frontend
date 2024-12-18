import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContactInterface} from '../interface/contact.interface';
import {Observable} from 'rxjs';
import {environmentProduct} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private appUrl: string;
  private appContact: string;


  constructor(private http: HttpClient) {
    this.appUrl = environmentProduct.apiUrl;
    this.appContact = '/api/contact'
  }


  sendMessage(contact: ContactInterface): Observable<ContactInterface> {
    return this.http.post<ContactInterface>(`${this.appUrl}${this.appContact}`, contact);
  }
}
