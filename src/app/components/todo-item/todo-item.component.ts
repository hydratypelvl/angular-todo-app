import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Todo } from './../../interfaces/todo';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Input() completed: boolean;
  @Output() checkedItem = new EventEmitter();
  @Output() doubleClickedItem = new EventEmitter();
  @Output() cancelledItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();
  @Output() doneTask = new EventEmitter();
  @Output() itemTitle = new FormControl('');
  @Output() itemCompleted = new FormControl(true);
  beforeEditCache: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.itemTitle = new FormControl(this.todo.title);
    this.itemCompleted = new FormControl(this.todo.completed);
    this.beforeEditCache = '';
  }

  checkedItems(todo: Todo){
    // todo = Object.assign({}, todo);
    todo.completed = !todo.completed;
    this.checkedItem.emit(todo);
  }

  doneEdit(todo: Todo): void {
    this.todo.title = this.itemTitle.value;
    this.doneTask.emit(todo);
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    this.doubleClickedItem.emit(todo);
  }

  cancelEdit(todo: Todo): void {
    this.itemTitle.setValue(this.beforeEditCache);
    this.cancelledItem.emit(todo);
  }

  deleteTodo(todo: Todo): void {
    this.deletedItem.emit(todo);
  }

  changeDetect() {
    console.log('todo', this.todo.completed);
    this.cdr.detectChanges();
  }
}
