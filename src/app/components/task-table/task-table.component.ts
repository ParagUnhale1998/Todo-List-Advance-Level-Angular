import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/todo.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {
  @Input() allTasks!: any[];
  @Input() selectedCategory!: string;
  @Input() selectedDateFilter!: string;
  @Input() selectedPriorityFilter!: string;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() { }

  editTask(task: any) {
    this.edit.emit(task);
  }
  
  trackById(index: any, task: Task): any {
    return task.id;
  }

  deleteTask(task: any, taskRow: any) {
    this.delete.emit(task);
  
    task.completed = !task.completed;
  
    if (task.completed) {
      taskRow.classList.add('underline'); 
    } else {
      taskRow.classList.remove('underline'); 
    }
  }
  
}
