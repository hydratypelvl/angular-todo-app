import { Todo } from './../interfaces/todo';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';
const defaultTodoList = [
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

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todos: Todo[];

  get todoList(): Todo[] {
    return this.todos;
  }

  set todoList(todos: Todo[]) {
    this.todos = todos;
  }

  constructor(private storageService: StorageService) {
    this.todos = storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todos);
  }

  getTodoList() {
    return this.todos;
  }

  addItem(item: Todo) {
    this.todos.push(item);
    this.saveList();
  }

  checkAllTodos() {
    this.todos.forEach(todo => todo.completed);
    this.saveList();
  }

  deleteItem(todo: any) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.saveList();
  }

  deleteCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);

    this.saveList();
  }

  cancelEdit(todo: Todo) {
    todo.editing = false;
    this.saveList();
  }
  doneEdit() {
    this.saveList();
  }

}
