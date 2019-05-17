import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let auth = btoa("acme:acmesecret");
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + auth,
      //'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = {headers: headers};
    const payload = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<any>('http://localhost:9090/uaa/oauth/token', payload, options)
      .pipe(map(resp => {
        // login successful if there's a jwt token in the response
        if (resp && resp.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp));
          this.currentUserSubject.next(resp);
        }
        return resp;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken() {
    let authStr = localStorage.getItem("currentUser");
    if (authStr) {
      let auth = JSON.parse(authStr);
      return auth['access_token'];
    }
    throw 'User does not have an access token.'
  }
}
