import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListItemService } from '../list-item.service';

@Component({
  selector: 'app-list-item-form',
  templateUrl: './list-item-form.component.html',
  styleUrls: ['./list-item-form.component.scss']
})
export class ListItemFormComponent implements OnInit , OnDestroy{

  itemId: number = 0;
  listId: number = 0;
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  postListItem$: Subscription = new Subscription();
  putListItem$: Subscription = new Subscription();

  listItemForm = new FormGroup({
    id: new FormControl(''),
    listId: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  constructor( private router: Router,  private route: ActivatedRoute,
    private listItemService: ListItemService) {this.isAdd = this.router.url === '/newlistitem'; this.isEdit = !this.isAdd;}

    ngOnDestroy(): void {
      this.postListItem$.unsubscribe();
      this.putListItem$.unsubscribe();
    }

  ngOnInit(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.itemId = +id;
        this.listItemService.getListItemById(+id).subscribe(result => {this.listItemForm.patchValue({
          id: result.id,
          listId: result.listId,
          title: result.title,
          description: result.description,
          Date: result.date,
        });
      });
    }
    }
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new item';
    } else {
      return 'Edit item';
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.submitData();
  }

  submitData(): void {    
    if (this.isAdd) {
      //Add
      this.postListItem$ = this.listItemService.postListItem(this.listItemForm.value).subscribe(result => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    } else {
      //edit
      this.putListItem$ = this.listItemService.putListItem(this.itemId, this.listItemForm.value).subscribe(result => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
  }
}
