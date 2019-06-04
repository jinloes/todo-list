import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    let params = new HttpParams()
      .append('size', '50');
    return this.http.get(`${this.baseUrl}`, {params: params});
  }

  create(task: Task): Observable<any> {
    return this.http.post(`${this.baseUrl}`, task);
  }
}
