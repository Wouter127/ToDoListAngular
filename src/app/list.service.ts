import { Injectable } from '@angular/core';
import { List } from './list';

import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) {
  }

  getLists(): Observable<List[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<List[]>("http://localhost:3000/lists")));
  };

  getListById(id: number): Observable<List>{
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id)
  };
}
