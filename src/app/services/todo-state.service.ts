import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/todo.model';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';
import { TosteService } from './toste.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private baseUrl: string = `${environment.apiUrl}/tasks`;

  // private baseUrl = 'http://localhost:3000/tasks';

  private todos: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient,private loadingService:LoadingService,private toastService:TosteService) {
    this.fetchInitialData();
    
  }
  
  fetchInitialData(): void {
    this.loadingService.setLoading(true);
    this.http.get<Task[]>(this.baseUrl).pipe(
      retry(3), 
      catchError(error => {
        this.toastService.showFailure('Error fetching initial data:');
        console.error('Error fetching initial data:', error);
        return throwError(error); 
      }),
      finalize(() => {
        this.loadingService.setLoading(false);
      })
    ).subscribe({
      next: (tasks: Task[]) => {
        this.todos.next(tasks);
      }
    });
  }
  
  

  getTodos(): Observable<Task[]> {
    return this.todos.asObservable();
  }

  addTodo(todo: Task): void {
    const currentTodos = this.todos.getValue();
    const updatedTodos = [...currentTodos, todo];
    this.todos.next(updatedTodos);
  }

  updateTodo(updatedTodo: Task): void {
    const currentTodos = this.todos.getValue();
    const updatedTodos = currentTodos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.todos.next(updatedTodos);
  }

  deleteTodo(todoId: any): void {
    const currentTodos = this.todos.getValue();
    const updatedTodos = currentTodos.filter((todo) => todo.id !== todoId);
    this.todos.next(updatedTodos);

    // const indexToDelete = currentTodos.findIndex((todo) => todo.id === todoId);
    // if (indexToDelete !== -1) {
    //   currentTodos.splice(indexToDelete, 1);
    // }
  }
}
// private fetchInitialData(): void {
  //   this.loadingService.setLoading(true);
  //   this.http.get<Task[]>(this.baseUrl).pipe().subscribe({
  //     next:(tasks: Task[]) => {
  //       this.loadingService.setLoading(false);
  //       this.todos.next(tasks);
  //     },
  //     error:(error) => {
  //       this.toastService.showFailure('Error fetching initial data:')
  //       this.loadingService.setLoading(false);
  //       console.error('Error fetching initial data:', error);
  //     }
  //   });
  // }