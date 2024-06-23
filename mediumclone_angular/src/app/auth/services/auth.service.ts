import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LogingRequestInterface } from '../types/loginRequest.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LogingRequestInterface): Observable<CurrentUserInterface> {
    console.log('Calling login');

    const url = environment.apiUrl + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }
}
