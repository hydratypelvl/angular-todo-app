import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTodosPipe } from './filter-todos.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterTodosPipe],
  exports: [FilterTodosPipe],
})
export class PipesModule { }
