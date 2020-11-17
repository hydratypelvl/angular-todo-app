import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipePipe } from './filter-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipePipe],
  exports: [FilterPipePipe],
})
export class PipesModule { }
