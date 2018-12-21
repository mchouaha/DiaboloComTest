import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': JSON.parse(localStorage.getItem('userobj')).id
  });

  constructor(private http: HttpClient) { }

  getAllCalls(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Calls`, {
      headers: this.headers });
  }
  replaceCall(newModel:Object): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/Calls`, newModel, {
      headers: this.headers });
  }
}

