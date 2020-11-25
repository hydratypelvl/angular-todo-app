import { Todo } from './../../interfaces/todo';
import { TodoListService } from './../../services/todo-list.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { uuidv4 } from './../../utils/uuid.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  itemTitle = new FormControl('');
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;

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

  // pass ngModel value and map all todos to it
  checkAllTodos(value: boolean): void {
    this.todos = this.todos.map(todo => ({
      ...todo,
      completed: value
    }));

    this.anyRemainingModel = this.anyRemaining();
    this.todoListService.checkAllTodos();
    this.cdr.detectChanges();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }
}
