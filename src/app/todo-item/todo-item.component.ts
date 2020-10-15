import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from './../interfaces/todo';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
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
  @Output() checkedItem = new EventEmitter();
  @Output() doubleClickedItem = new EventEmitter();
  @Output() cancelledItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();
  @Output() doneTask = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateItem(todo: Todo) {
    this.doneTask.emit({
      id: this.todo.id,
      title: this.todo.title,
      comepleted: {completed: !this.todo.completed},
      editing: false
    });
  }

  checkedItems(todo: Todo){
    this.checkedItem.emit(todo);
  }

  doneEdit(todo: Todo): void {
    this.doneTask.emit(todo);
  }

  editTodo(todo: Todo): void {
    this.doubleClickedItem.emit(todo);
  }

  cancelEdit(todo: Todo): void {
    this.cancelledItem.emit(todo);
  }

  deleteTodo(todo: Todo): void {
    this.deletedItem.emit(todo);
  }
}
