import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../list-item';
import { List } from '../list';
import { ListService } from '../list.service';
import { ListItemService } from '../list-item.service';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() listItem: ListItem = { id: 0, title: "", listId: 0, description: "", date: "", statusId: 0, order: 0 };

  //constructor(private listItemService: ListItemService, private listService: ListService) { }
  constructor(private listItemService: ListItemService) { }


  listItems$: Observable<ListItem[]> = new Observable<ListItem[]>();
  listItems: ListItem[] = [];
  

  ngOnInit(): void {
  }

}
