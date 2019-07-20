import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../task';
import {AuthenticationService} from "./authentication.service";
import {map} from 'rxjs/operators';

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

  create(task: Task): Observable<Task> {
    return this.http.post(`${this.baseUrl}`, task)
      .pipe(map(json => Task.fromJson(<JSON>json)));
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get(`${this.baseUrl}/${taskId}`)
      .pipe(map(json => Task.fromJson(<JSON>json)));
  }

  update(taskId: string, task: Task) {
    return this.http.put(`${this.baseUrl}/${taskId}`, task);
  }
}
