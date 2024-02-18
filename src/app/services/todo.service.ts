import { Injectable } from '@angular/core';
import { Task } from '../models/todo.model';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TodoStateService } from './todo-state.service';
import { TosteService } from './toste.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl: string = `${environment.apiUrl}/tasks`;

// private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient,private todoStateService:TodoStateService,private toastService:TosteService,private loadingService:LoadingService) { }

  getAllTodos(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTodoById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }
  
  createTodo(todo: Task): Observable<Task> {
    this.loadingService.setLoading(true);
    return this.http.post<Task>(this.baseUrl, todo).pipe(
      tap(task => {
        this.todoStateService.addTodo(todo)
        this.toastService.showSuccess('Task added successfully.');
      }),
      catchError((error) => {
        this.toastService.showFailure('Failed to add Task.');
       throw error // or return []; // of(`I caught: ${error}`)
      }),
      finalize(() => {
        this.loadingService.setLoading(false); 
      })
    );
  }

  editTodo(todo: any): Observable<any> {
    this.loadingService.setLoading(true);
    return this.http.patch<any>(`${this.baseUrl}/${todo.id}`, todo).pipe(
      tap(task => {
        this.todoStateService.updateTodo(todo)
        this.toastService.showSuccess('Task Updated successfully.');

      }),
      catchError((error) => {
        this.toastService.showFailure('Failed to Update Task.');
       throw error  
      }),
      finalize(() => {
        this.loadingService.setLoading(false); 
      })
    );
  }

  deleteTodo(id: any): Observable<any> {
    this.loadingService.setLoading(true);
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(task => {
        this.todoStateService.deleteTodo(id)
        this.toastService.showSuccess('Task Delete successfully.');

      }),
      catchError((error) => {
        this.toastService.showFailure('Failed to Delete Task.');
       throw error 
      }),
      finalize(() => {
        this.loadingService.setLoading(false); 
      })
    );
  }
}
/*private handleRequest<T>(request: Observable<T>): Observable<T> {
    this.loadingService.setLoading(true);
    return request.pipe(
      catchError(error => {
        this.toastService.showFailure('An error occurred.');
        console.error('An error occurred:', error);
        return of([]); // Return an empty observable to continue execution
      }),
      finalize(() => {
        this.loadingService.setLoading(false);
      })
    );
  }

  getAllTodos(): Observable<Task[]> {
    return this.handleRequest(this.http.get<Task[]>(this.baseUrl));
  }

  getTodoById(id: number): Observable<Task> {
    return this.handleRequest(this.http.get<Task>(`${this.baseUrl}/${id}`));
  }

  createTodo(todo: Task): Observable<Task> {
    return this.handleRequest(this.http.post<Task>(this.baseUrl, todo).pipe(
      tap(() => {
        this.todoStateService.addTodo(todo);
        this.toastService.showSuccess('Task added successfully.');
      })
    ));
  }

  editTodo(todo: Task): Observable<Task> {
    return this.handleRequest(this.http.patch<Task>(`${this.baseUrl}/${todo.id}`, todo).pipe(
      tap(() => {
        this.todoStateService.updateTodo(todo);
        this.toastService.showSuccess('Task updated successfully.');
      })
    ));
  }

  deleteTodo(id: any): Observable<any> {
    return this.handleRequest(this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.todoStateService.deleteTodo(id);
        this.toastService.showSuccess('Task deleted successfully.');
      })
    ));
  }
}*/


/* private handleRequest<T>(
    request: Observable<T>,
    successMessage: string = 'Operation successful.',
    failureMessage: string = 'An error occurred.'
  ): Observable<T> {
    this.loadingService.setLoading(true);
    return request.pipe(
      tap(() => {
        this.toastService.showSuccess(successMessage);
      }),
      catchError(error => {
        this.toastService.showFailure(failureMessage);
        console.error('An error occurred:', error);
        return of([]); // Return an empty observable to continue execution
      }),
      finalize(() => {
        this.loadingService.setLoading(false);
      })
    );
  }


   createTodo(todo: Task): Observable<Task> {
    return this.handleRequest(
      this.http.post<Task>(this.baseUrl, todo),
      'Task added successfully.',
      'Failed to add task.'
    );
  }

  */