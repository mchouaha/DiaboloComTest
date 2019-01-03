import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getToken() {
      return localStorage.getItem('userobj');
  }

  isAuthenticated(): boolean {
      return this.getToken() !== null;
  }

  login(username: string, password: string):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Users/login`, { username: username, password: password }, {headers: this.headers})
      .pipe(
        filter(user => user),
        map(user => {
        if (user) {
            localStorage.setItem('userobj', JSON.stringify(user));
            localStorage.setItem('username', username);
        }
        return user;
      }));
  }

  logout(): void  {
      localStorage.removeItem('userobj');
      localStorage.removeItem('username');
  }
}
