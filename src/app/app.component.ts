import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Task } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo-List';

}
