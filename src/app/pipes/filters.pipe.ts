import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/todo.model';


@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(tasks: Task[], selectedCategory: string, selectedDateFilter: string, selectedPriorityFilter: string): Task[] {
    let filteredTodos = tasks;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filteredTodos = filteredTodos.filter(task => task.category === selectedCategory);
    }

    // Filter by date
    if (selectedDateFilter === 'latest') {
      filteredTodos = filteredTodos.sort((a, b) => {
        return +new Date(b.createdDate) - +new Date(a.createdDate);
      });
    } else {
      filteredTodos = filteredTodos.sort((a, b) => {
        return +new Date(a.createdDate) - +new Date(b.createdDate);
      });
    }

    // Filter by priority
    if (selectedPriorityFilter !== 'all') {
      filteredTodos = filteredTodos.filter(todo => todo.priority === selectedPriorityFilter);
    }
   

    return filteredTodos;
  }
}
