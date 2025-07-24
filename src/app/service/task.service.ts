import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/Task';
import {environment} from '../../environment/prod';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
  save(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }
  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
