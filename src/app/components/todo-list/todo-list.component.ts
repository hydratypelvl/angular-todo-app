import { Todo } from './../../interfaces/todo';
import { TodoListService } from './../../services/todo-list.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  itemTitle = new FormControl('');
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.anyRemainingModel = true;
    this.filter = 'all';
    this.beforeEditCache = '';
    this.todos = this.todoListService.getTodoList();
    // window.alert();
  }

  addTodo(): void {
    // checks if task is not null
    if (this.itemTitle.value.trim().length === 0) {
      return;
    }
    // Generates Unique User ID
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    // adds todo to a list
    this.todoListService.addItem({
      id: uuidv4(),
      title: this.itemTitle.value.trim(),
      completed: false,
      editing: false
    });
    // resets todo input
    this.itemTitle.setValue('');
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

  doneEdit(todo: Todo) {
    // window.alert(this.itemTitle.value);
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;
    this.todoListService.doneEdit();
  }

  deleteTodo(todo: Todo): void {
    this.todoListService.deleteItem(todo);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todoListService.deleteCompleted();
  }

  checkedItems(todo: Todo) {
    this.todoListService.checkedItems();
  }

  checkAllTodos(event: any): void {
    this.todos.forEach(todo => todo.completed = (event.target as HTMLInputElement).checked);
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    // if (this.filter === 'all') {
    //   return this.todos;
    // } else if (this.filter === 'active') {
    //   return this.todos.filter(todo => !todo.completed);
    // } else if (this.filter === 'completed') {
    //   return this.todos.filter(todo => todo.completed);
    // }

    return this.todos;
  }

}
