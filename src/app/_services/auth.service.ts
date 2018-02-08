import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {}

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'login', model, this.requestOptions())
      .map((resp: Response) => {
        const user = resp.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          console.log(this.decodedToken);
          this.userToken = user.tokenString;
        }
      }).catch(this.handleError);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  getUserName(): string {
    if (this.decodedToken) {
      return this.decodedToken.unique_name;
    }
  }

  private requestOptions() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }
}
