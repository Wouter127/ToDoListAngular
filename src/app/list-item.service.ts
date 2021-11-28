import { Injectable } from '@angular/core';
import { ListItem } from './list-item';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  constructor(private httpClient: HttpClient) {
  }

  getListItems(): Observable<ListItem[]> {
    return this.httpClient.get<ListItem[]>("http://localhost:3000/items");
  }

  getListItemById(id: number): Observable<ListItem> {
    return this.httpClient.get<ListItem>("http://localhost:3000/items/" + id);
  }

  getListItemsExpanded(): Observable<ListItem[]> {
    return this.httpClient.get<ListItem[]>("http://localhost:3000/items?_expand=list")
  }

  getListItemsByListId(listId: number): Observable<ListItem[]> {
    return this.httpClient.get<ListItem[]>("http://localhost:3000/items?listId=" + listId + "&_expand=status");
  }

  getItemsOfList(listId: number) : Observable<ListItem[]> {
    let params = new HttpParams();
    params=params.set('listId', listId);
    params=params.set('_sort', 'order');
    return this.httpClient.get<ListItem[]>("http://localhost:3000/items", {params: params});
  }

  deleteListItem(id: number): Observable<ListItem> {
    return this.httpClient.delete<ListItem>('http://localhost:3000/items/' + id);
  }
  
  putListItem(id: number, list: ListItem): Observable<ListItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  
    return this.httpClient.put<ListItem>("http://localhost:3000/items/" + id, list, {headers: headers});
  }

  postListItem(list: ListItem): Observable<ListItem> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<ListItem>("http://localhost:3000/items", list, {headers: headers});
  }
}
