import { TodoItemId } from './../interfaces/todo-item-id';
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

const todoId = 'todo-list-id';
const defaultId = 4;

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todos: Todo[];
  private TodoItemId: number;

  constructor(private storageService: StorageService) {
    this.todos = storageService.getData(todoListStorageKey) || defaultTodoList;
    this.TodoItemId = storageService.getData(todoId) || defaultId;
  }

  getTodoId() {
    return this.TodoItemId++;
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todos);
  }
  saveId() {
    this.storageService.setData(todoId, this.TodoItemId++);
  }

  getTodoList() {
    return this.todos;
  }

  addItem(item: Todo) {
    this.todos.push(item);
    this.saveList();
    this.saveId();
  }

  checkedItems() {
    this.todos.forEach(todo => todo.completed);
    this.saveList();
  }

  deleteItem(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
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
