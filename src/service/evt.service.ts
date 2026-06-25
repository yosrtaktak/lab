import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../model/evenement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvtService {
   baseUrl= 'http://localhost:3100/evenement';
  constructor(private http: HttpClient) { }

  GetAllEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.baseUrl);
  }

  addEvent(event: Evenement): Observable<void> {
    return this.http.post<void>(this.baseUrl, event);
}

  GetEventById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: string, event: Evenement): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, event);
  }

  updateEvent2(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, {Titre:'Conférence',lieu:'Paris'}); //patch pour modiffication 1 ou 2 attribut sinon put envoi tout l'objet
  }

  deleteEvtById(id: string): Observable<void> {
   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}