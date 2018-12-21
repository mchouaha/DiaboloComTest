import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private token = JSON.parse(localStorage.getItem('userObj')).id;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': this.token
  });

  constructor(private http: HttpClient) { }

  getAllCalls(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Calls`, {
      headers: this.headers
    }).pipe(
       tap( // Log the result or error
        // data => console.log(data),
        // error => console.log(error)
          )
      );
  }
  replaceCall(newModel:Object): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/Calls`, newModel, {
      headers: this.headers
    }).pipe(
        tap( // Log the result or error
            // data => console.log(data),
            // error => console.log(error)
        )
    );
  }
}

