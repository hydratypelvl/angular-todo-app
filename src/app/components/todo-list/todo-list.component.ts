import { Todo } from './../../interfaces/todo';
import { TodoListService } from './../../services/todo-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;
  todoListService: TodoListService;

  constructor(todoListService: TodoListService) {
    this.todoListService = todoListService;
  }

  ngOnInit(): void {
    this.anyRemainingModel = true;
    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';
    this.todos = this.todoListService.getTodoList();
    this.idForTodo = Math.max(...this.todos.map(id => id.id)) + 1;
  }
  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoListService.addItem({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    });

    this.todoTitle = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
    this.todoListService.cancelEdit(todo);
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;
    this.todoListService.doneEdit();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todoListService.deleteItem(id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todoListService.deleteCompleted();
  }

  checkedItems(todo: Todo) {
    this.todoListService.checkedItems();
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (event.target as HTMLInputElement).checked);
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

}
