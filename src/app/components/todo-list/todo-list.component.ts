import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoStateService } from 'src/app/services/todo-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit,OnDestroy{
  tasks: Task[] = [];

  private todosSubscription!: Subscription;

  constructor(private todoService: TodoService,private ngbModalService: NgbModal,
    private todoStateService:TodoStateService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
   this.todosSubscription = this.todoStateService.getTodos().subscribe((todos: Task[]) => {
      this.tasks = todos;
    });
  }

 
  onEdit(task: any) {
    const modalRef = this.ngbModalService.open(TodoFormComponent);
    modalRef.componentInstance.taskData = task;
    modalRef.componentInstance.editMode = true;
  }

  onDelete(task: any) {
    setTimeout(() => {
      this.todoService.deleteTodo(task.id).subscribe(res => {
        this.todoStateService.deleteTodo(task.id)
        // console.log('Delete task:', res);
      })
    }, 500);
   
  }

  selectedCategory: string = 'all';
  selectedDateFilter: string = 'latest';
  selectedPriorityFilter: string = 'all';

  onFilterChange(filterEvent: any): void {
    this.selectedCategory = filterEvent.category;
    this.selectedDateFilter = filterEvent.dateFilter;
    this.selectedPriorityFilter = filterEvent.priorityFilter;
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
  } 
}
/*

  filteredTodos: Task[] = [];

        // this.filteredTodos = data;

   trackById(index: any, user: Task): any {
    return user.id;
  }


  onEditTask(task: Task): void {
    // Implement logic to handle task editing
    console.log('Edit task:', task);
  }

  // Method to handle delete task event
  onDeleteTask(task: Task): void {
    // Implement logic to handle task deletion
    console.log('Delete task:', task);
  }

  toggleCompletion(task: any, taskRow: any) {
    task.completed = !task.completed;

    taskRow.classList.add('underline');

    setTimeout(() => {
      this.tasks = this.tasks.filter(item => item.id !== task.id);
    }, 500);
  }

  selectedCategory: string | undefined = 'all';
  selectedDateFilter: string | undefined = 'latest';
  selectedPriorityFilter: string | undefined = 'all';
  
  onFilterChange(filterEvent: any): void {
    this.selectedCategory = filterEvent.category;
    this.selectedDateFilter = filterEvent.dateFilter;
    this.selectedPriorityFilter = filterEvent.priorityFilter;
    this.filterTodos();
  }

  filterTodos() {
    if (this.selectedCategory === 'all') {
      this.filteredTodos = this.tasks; 
    } else {
      this.filteredTodos = this.tasks.filter(todo => todo.category === this.selectedCategory);
    }
  
    if (this.selectedDateFilter === 'latest') {
      this.filteredTodos = this.filteredTodos.sort((a, b) => {
        return +new Date(b.dueDate) - +new Date(a.dueDate);
      });
    } else {
      this.filteredTodos = this.filteredTodos.sort((a, b) => {
        return +new Date(a.dueDate) - +new Date(b.dueDate);
      });
    }
  
    if (this.selectedPriorityFilter !== 'all') {
      this.filteredTodos = this.filteredTodos.filter(todo => todo.priority === this.selectedPriorityFilter);
    }
  }
  
*/
