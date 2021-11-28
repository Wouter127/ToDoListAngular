import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormComponentComponent } from './list-form-component.component';

describe('ListFormComponentComponent', () => {
  let component: ListFormComponentComponent;
  let fixture: ComponentFixture<ListFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
