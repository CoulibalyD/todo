import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/task.model';
import {environment} from '../../environment/prod';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = environment.apiUrl + '/task';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + "/create", task);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`/task/${id}`, task);
  }

  getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl+"/my");
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}
