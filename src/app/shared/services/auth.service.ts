import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private clientId = environment.client_id;
  private tokenUrl = `${this.baseUrl}/o/token/`;
  private revokeTokenUrl = `${this.baseUrl}/o/revoke_token/`;
  private token: string;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('access-token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

  refreshToken(): Observable<string> {
    let refresh_token = this.getRefreshToken();

    if (!refresh_token) {
      this.logout();
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('refresh_token', refresh_token)
      .set('client_id', this.clientId)
      .set('grant_type', 'refresh_token');
    return this.http.post(this.tokenUrl, body.toString(), httpOptions).pipe(
      map((res: HttpResponse<any>) => this.extractToken(res)),
      catchError(e => this.handleError(e))
    );
  }

  authenticate(username: string, password: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('client_id', this.clientId)
      .set('grant_type', 'password');
    return this.http.post(this.tokenUrl, body.toString(), httpOptions).pipe(
      map(res => this.extractToken(res)),
      catchError(e => this.handleError(e))
    );
  }

  logout(): Observable<Object> {
    let token = this.getToken();

    if (!token) {
      return of(null);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('token', token);
    return this.http.post(this.revokeTokenUrl, body.toString(), httpOptions).pipe(
      map(res => {
        this.clear();
        return { success: 1 };
      }),
      catchError(e => this.handleError(e))
    );
  }

  handleError(e) {
    return throwError(e);
  }

  hasValidToken(): boolean {
    return !!this.getToken();
  }

  clear() {
    localStorage.clear();
  }

  extractToken(res: any): string {
    localStorage.setItem('access-token', res.access_token);
    localStorage.setItem('refresh-token', res.refresh_token);
    this.token = res.access_token;
    return this.token;
  }

  saveUser(res: any) {
    const user = Object.assign(new User(), res);
    localStorage.setItem('user', JSON.stringify(res));
    localStorage.setItem('user-group', JSON.stringify(user.groups));
    return user;
  }

  getUserDetails() {
    return this.http.get(`${this.baseUrl}/api/current-user`);
  }

  loadUser(): User {
    const o = localStorage.getItem('user');
    let user = null;
    if (!_.isNull(o)) {
      user = JSON.parse(o);
    }

    return user;
  }

  hasRole(role) {
    const group = localStorage.getItem('user-group');
    if (_.isNull(group)) {
      return false;
    }

    const roles = JSON.parse(group);
    const b = _.some(roles, (value, i, ls) => {
      return role === value.name;
    });
    return b;
  }

  // __hasRole(givenRole) {
  //   const userRoles: any = JSON.parse(localStorage.getItem('user-group'));
  //   const s = _.some(userRoles, (value, i, ls) => {
  //     const b = _.findIndex(givenRole, (k) => {
  //       return k === value.name;
  //     });
  //     return b >= 0;
  //   });
  //   return s;
  // }
}
