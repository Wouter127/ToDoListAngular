import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListFormComponentComponent } from './list-form-component/list-form-component.component';
import { ListItemFormComponent } from './list-item-form/list-item-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'newlist', component: ListFormComponentComponent },
  { path: 'editlist/:id', component: ListFormComponentComponent },
  { path: 'newlistitem/:listId', component: ListItemFormComponent },
  { path: 'editlistitem/:id', component: ListItemFormComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
