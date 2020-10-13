import { Todo } from '../interfaces/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoList: Todo[] = [
    {
      id: 1,
      title: 'Make Todo App',
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: 'Make Animations',
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: 'Push To Git',
      completed: false,
      editing: false,
    },
  ];

  constructor() { }

  getTodoList() {
    return this.todoList;
  }
}
