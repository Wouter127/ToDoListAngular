import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-form-component',
  templateUrl: './list-form-component.component.html',
  styleUrls: ['./list-form-component.component.scss']
})
export class ListFormComponentComponent implements OnInit , OnDestroy {

  name: string = '';
  backgroundColor: string = '#ffffff';
  textColor: string = '#000000';

  colorPalette:Array<any> = [
    '#ACE9DD',
    '#B5EFCE',
    '#B7DCF4',
    '#DDC6E7',
    '#B9C0C9',
    '#ADDED4',
    '#B4E4C9',
    '#B5D4E9',
    '#DBBDE5',
    '#B5BDC4',
    '#FBEBA5',
    '#F6D3AF',
    '#F8C3B9',
    '#FAFCFC',
    '#DBE2E2',
    '#FDDDAA',
    '#F0C3A3',
    '#EBBAB4',
    '#E8EAEC',
  ]
  
  listId: number = 0;
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  postList$: Subscription = new Subscription();
  putList$: Subscription = new Subscription();
  
  listForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    textcolor: new FormControl('', [Validators.required]),
  });

  constructor( private router: Router,  private route: ActivatedRoute,
    private listService: ListService) {this.isAdd = this.router.url === '/newlist'; this.isEdit = !this.isAdd;}

  ngOnInit(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.listId = +id;
        this.listService.getListById(+id).subscribe(result => {this.listForm.patchValue({
          id: result.id,
          name: result.name,
          color: result.color,
          textcolor: result.textcolor,
        });
      });
    }
    }
  }

  colors(backgroundColor: string, textColor: string) {
    return {'color': textColor, 'background-color': backgroundColor}
  }

  ngOnDestroy(): void {
    this.postList$.unsubscribe();
    this.putList$.unsubscribe();
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new list';
    } else {
      return 'Edit list';
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.submitData();
  }

  submitData(): void {    
    if (this.isAdd) {
      //Add
      this.postList$ = this.listService.postList(this.listForm.value).subscribe(result => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    } else {
      //edit
      this.putList$ = this.listService.putList(this.listId, this.listForm.value).subscribe(result => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
  }

}
