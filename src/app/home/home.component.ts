import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.getLists();
  }  
  
  colors(color: string, textcolor: string) {
    return {'color': textcolor, 'background-color': color}
  }

  getLists(){
    this.lists$ = this.listService.getLists().subscribe(result => this.lists = result)
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    console.log("click ADD");
    
    this.router.navigate(['newlist']);
  }

  edit(id: number) {
    //TODO
    this.router.navigate(['editlist/' + id]);
  }

  delete(id: number) {
    this.deleteList$ = this.listService.deleteList(id).subscribe(result => {
      //all went well
      this.getLists();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
}
