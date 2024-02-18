import { Component, OnInit } from '@angular/core';
import { TodoStateService } from 'src/app/services/todo-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showPopup: boolean = true; 

  ngOnInit(): void {
    
  }
  closePopup(){
    this.showPopup = false
  }
}
