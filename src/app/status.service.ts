import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from './status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) { }

  getStatuses(): Observable<Status[]> {
    return this.httpClient.get<Status[]>("http://localhost:3000/statuses");
  }

  getStatusById(id: number): Observable<Status> {
    return this.httpClient.get<Status>("http://localhost:3000/statuses/" + id);
  }

  postStatus(category: Status): Observable<Status> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Status>("http://localhost:3000/statuses", category, {headers: headers});
  }

  putStatus(id:number, category: Status): Observable<Status> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Status>("http://localhost:3000/statuses/" + id, category, {headers: headers});
  }

  deleteStatus(id: number): Observable<Status> {
    return this.httpClient.delete<Status>("http://localhost:3000/statuses/" + id);
  }

  
}