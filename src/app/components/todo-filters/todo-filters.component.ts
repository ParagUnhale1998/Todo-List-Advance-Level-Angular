import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss']
})
export class TodoFiltersComponent {
  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  selectedCategory: string = 'all';
  selectedDateFilter: string = 'latest';
  selectedPriorityFilter: string = 'all';
  categoryOptions: string[] = ['all', 'Work', 'Personal', 'Office'];
  priorityOptions: string[] = ['all', 'Low', 'Medium', 'High'];


  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.onFilterChange();
  }
 
  selectDateFilter(filterDates: string): void {
    this.selectedDateFilter = filterDates;
    this.onFilterChange();
  }

  selectPriority(priority: string): void {
    this.selectedPriorityFilter = priority;
    this.onFilterChange();
  }
  
  onFilterChange(): void {
    this.filterChange.emit({
      category: this.selectedCategory,
      dateFilter: this.selectedDateFilter,
      priorityFilter: this.selectedPriorityFilter
    });
  }
}
/*import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface TodoFilters {
  category: string;
  dateFilter: string;
  priorityFilter: string;
}

export const CATEGORY_OPTIONS: string[] = ['all', 'Work', 'Personal', 'Office'];
export const PRIORITY_OPTIONS: string[] = ['all', 'Low', 'Medium', 'High'];

@Component({
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss']
})
export class TodoFiltersComponent implements OnInit {
  @Output() filterChange: EventEmitter<TodoFilters> = new EventEmitter<TodoFilters>();

  selectedCategory: string;
  selectedDateFilter: string;
  selectedPriorityFilter: string;
  categoryOptions: string[] = CATEGORY_OPTIONS;
  priorityOptions: string[] = PRIORITY_OPTIONS;

  ngOnInit(): void {
    this.selectedCategory = 'all';
    this.selectedDateFilter = 'latest';
    this.selectedPriorityFilter = 'all';
  }

  updateFilter(property: string, value: string): void {
    switch (property) {
      case 'category':
        this.selectedCategory = value;
        break;
      case 'dateFilter':
        this.selectedDateFilter = value;
        break;
      case 'priorityFilter':
        this.selectedPriorityFilter = value;
        break;
      default:
        break;
    }
    this.emitFilterChange();
  }

  emitFilterChange(): void {
    this.filterChange.emit({
      category: this.selectedCategory,
      dateFilter: this.selectedDateFilter,
      priorityFilter: this.selectedPriorityFilter
    });
  }
}
*/