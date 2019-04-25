import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = '/todos';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
