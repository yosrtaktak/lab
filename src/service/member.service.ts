import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../model/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  //fonction qui genere des requetes http vers le backend
  baseUrl = 'http://localhost:3100/member';
  constructor(private http: HttpClient) { }
  getAllMembers():Observable<Member[]> {
   return this.http.get<Member[]>(this.baseUrl);
  }

  addMember(member: Member):Observable<void> {
    return this.http.post<void>(this.baseUrl, member);
}
   getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
   }
   updateMember(id: string, member: Member): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, member);
   }
   deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
}
