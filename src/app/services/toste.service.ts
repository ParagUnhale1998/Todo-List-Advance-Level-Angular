import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TosteService {

  constructor(private toastr: ToastrService) { }
  
showSuccess(message: string) {
  this.toastr.success(message, 'Success', {
    positionClass: 'toast-top-right' ,
    timeOut: 2000
  });
}

showFailure(message: string) {
  this.toastr.error(message, 'Error', {
    positionClass: 'toast-top-right',
    timeOut: 2000
  });
}

showWarning(message: string) {
  this.toastr.warning(message, 'Error', {
    positionClass: 'toast-top-right',
    timeOut: 2000
  });
}
}
