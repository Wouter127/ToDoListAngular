import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() listItem: ListItem = { id: 0, list_id: 0, description: "", date: "", status: "", order: 0 }

  constructor() { }

  ngOnInit(): void {
  }

}
