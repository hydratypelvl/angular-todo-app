import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListService } from './services/todo-list.service';
import { PipesModule } from './pipes/pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutofocusFixModule.forRoot(),
    BrowserAnimationsModule,
    PipesModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
