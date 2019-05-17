import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../task';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:9090/uaa/todos';

  constructor(private authService: AuthenticationService, private http: HttpClient) {
  }

  getTasks(): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken(),
    });
    let options = {headers: headers};
    return this.http.get(`${this.baseUrl}`, options);
  }

  create(task: Task): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken(),
    });
    let options = {headers: headers};
    return this.http.post(`${this.baseUrl}`, task, options);
  }
}
