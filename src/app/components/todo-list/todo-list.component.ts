import { Todo } from './../../interfaces/todo';
import { TodoListService } from './../../services/todo-list.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  itemTitle = new FormControl('');
  // itemCompleted = new FormControl(false);
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;
  isMasterSel: boolean;
  checkedCategoryLists: any;

  get todos(): Todo[] {
    return this.todoListService.todoList;
  }

  set todos(todo: Todo[]) {
    this.todoListService.todoList = todo;
  }

  constructor(private todoListService: TodoListService, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.anyRemainingModel = true;
    this.filter = 'all';
    this.beforeEditCache = '';
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
    todo.editing = true;
  }

  cancelEdit(todo: Todo): void {
    todo.editing = false;
    this.todoListService.cancelEdit(todo);
  }

  doneEdit(todo: Todo) {
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
    this.cdr.detectChanges();
  }

  checkUncheckAll(value: boolean): void {
    this.todos = this.todos.map(todo => ({
      ...todo,
      completed: value
    }));
    // this.todos.forEach(todo => todo.completed = !todo.completed);
    console.log('todos', this.todos);

    this.anyRemainingModel = this.anyRemaining();
    this.todoListService.checkAllTodos();
    this.cdr.detectChanges();
  }

  // checkUncheckAll() {
  //   for (const todo of this.todos) {
  //     todo.completed = !todo.completed;
  //   }
  //   this.anyRemainingModel = this.anyRemaining();
  //   this.todoListService.checkAllTodos();
  // }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  detectChanges() {
    this.cdr.markForCheck();
  }

}
