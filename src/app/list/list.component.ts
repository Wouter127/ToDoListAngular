import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { List } from '../list';
import { ListItem } from '../list-item';
import { ListItemService } from '../list-item.service';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List = { id: 0, name: "", color: "", textcolor: "" };

  listItems: ListItem[] = []
  listItems$: Subscription = new Subscription();
  deleteListItem$: Subscription = new Subscription();

  isChecked: boolean = false;
  value: number = 0;
  errorMessage: string = '';


  constructor(private listItemService: ListItemService, private router: Router) { }

  colors() {
    return {'color': this.list.textcolor, 'background-color': this.list.color}
  }
  
  ngOnInit(): void {
    this.getListItems(this.list.id);
  }

  getListItems(listId: number){
    this.listItems$ = this.listItemService.getItemsOfList(listId).subscribe(result => this.listItems = result)
  }

  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    this.listItems$.unsubscribe();
    this.deleteListItem$.unsubscribe();
  }

  add(listId: number) {
    this.router.navigate(['newlistitem/' + listId]);
  }

  edit(id: number, listId: number) {
    //TODO
    this.router.navigate(['editlistitem/' + id]);
  }

  delete(id: number) {
    this.deleteListItem$= this.listItemService.deleteListItem(id).subscribe(result => {
      //all went well
      this.getListItems(this.list.id);
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }
}
