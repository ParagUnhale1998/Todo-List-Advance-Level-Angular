import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Input() taskData: any;
  @Input() editMode!: boolean;

  taskForm!: FormGroup;
  todayDate!: Date;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private todoService  : TodoService,
  ) 
  {
    this.todayDate  = new Date()
  }

  ngOnInit(): void {
   
    this.initializeForm();
    if (this.editMode && this.taskData) {
      this.initializeEditTaskForm();
    }
  }

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      createdDate: [this.todayDate],
      dueDate: ['', Validators.required],
      category: ['Personal', Validators.required],
      priority: ['Medium', Validators.required],
      completed: [false, Validators.required]
    });
  }

  initializeEditTaskForm(): void {
    this.taskForm.patchValue({
      title: this.taskData?.title,
      description: this.taskData?.description,
      createdDate: this.taskData?.createdDate,
      dueDate: this.taskData?.dueDate,
      category: this.taskData?.category,
      priority: this.taskData?.priority,
      completed: this.taskData?.completed
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.editMode && this.taskData) {
        if(this.taskForm.pristine){
          alert('No changes were made.');
          return;
        }
        const updateTask = { id: this.taskData.id , ...task };
        this.todoService.editTodo(updateTask).subscribe((res) => {
          // console.log(res)
            this.editMode = false;
            this.taskData = null;
            this.activeModal.close();
          });
  

      } else {
        task.dueDate = new Date(task.dueDate).toISOString(); 
        this.todoService.createTodo(task).subscribe(res => {
          // console.log(res)
          this.activeModal.close();
        })
      }
      this.taskForm.reset();
      this.activeModal.close();

    }else{
      console.log('Form contains errors. Please check.');
    }
  }
}

/*import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Input() userData: any;
  @Input() editMode!: boolean;

  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.editMode && this.userData) {
      this.initializeEdittaskForm();
    }
  }

  
  private initializeForm(): void {
    this.taskForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  private initializeEdittaskForm(): void {
    this.taskForm.patchValue({
      firstname: this.userData?.firstname,
      lastname: this.userData?.lastname,
      email: this.userData?.email,
      address: this.userData?.address
    });
  }


  onSubmit(): void {
    if (this.taskForm.valid) {
    /*  const user: User = this.taskForm.value;
      if (this.editMode) {
        const user: User = {
          ...this.taskForm.value,
          id: this.userData.id,
        };
        if (user.id) {
          this.userService.updateUser(user).subscribe((updatedUser) => {
            this.dataService.notifyUserUpdate(updatedUser);
            this.activeModal.close();
            this.editMode = false;
            this.userData = null;
          });
        } else {
          console.error('User id is missing for update operation.');
        }
      } else {
        this.userService.addUser(user).subscribe((newUser) => {
          this.dataService.notifyUserAdd(newUser);
          this.activeModal.close();
        });
      }
      this.taskForm.reset();
    }
  }
}
*/