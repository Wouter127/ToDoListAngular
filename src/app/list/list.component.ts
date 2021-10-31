import { Component, Input, OnInit } from '@angular/core';
import { List } from '../list';
import { ListItem } from '../list-item';
import { ListItemService } from '../list-item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List = { id: 0, name: "", category: "" };

  listItems: ListItem[] = [];

  constructor(private listItemService: ListItemService) { }
  
  ngOnInit(): void {
    this.listItems = this.listItemService.getListItems();
  }

}
