import { Injectable } from '@angular/core';
import { ListItem } from './list-item';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  constructor() { }

  getListItems(): ListItem[] {
    let listItems: ListItem[] = [];

    let listItem1: ListItem = {
      id: 1,
      list_id: 1,
      date: "nog ni",
      description: "first item",
      order: 1,
      status: "busy"
    };

    let listItem2: ListItem = {
      id: 2,
      list_id: 1,
      date: "nog ni",
      description: "second item",
      order: 1,
      status: "busy"
    };

    let listItem3: ListItem = {
      id: 3,
      list_id: 1,
      date: "nog ni",
      description: "thirth item",
      order: 3,
      status: "busy"
    };

    let listItem4: ListItem = {
      id: 4,
      list_id: 2,
      date: "nog ni",
      description: "fourth item",
      order: 1,
      status: "busy"
    };

    listItems.push(listItem1);
    listItems.push(listItem2);
    listItems.push(listItem3);
    listItems.push(listItem4);

    return listItems;

  }
}
