import { Injectable } from '@angular/core';
import { List } from './list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) {
  }

  getLists(): Observable<List[]> {
    // return timer(1, 10000).pipe(switchMap(() => this.httpClient.get<List[]>("http://localhost:3000/lists")));
    return this.httpClient.get<List[]>("http://localhost:3000/lists");
  };

  getListById(id: number): Observable<List>{
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id);
  };

  getListsEmbed(): Observable<List[]> {
    return this.httpClient.get<List[]>("http://localhost:3000/lists?_embed=items");
  };

  deleteList(id: number): Observable<List> {
    return this.httpClient.delete<List>('http://localhost:3000/lists/' + id);
  }
  
  putList(id: number, list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  
    return this.httpClient.put<List>("http://localhost:3000/lists/" + id, list, {headers: headers});
  }

  postList(list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>("http://localhost:3000/lists", list, {headers: headers});
  }
}
