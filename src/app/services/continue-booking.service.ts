import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContinueBookingComponent } from '../continue-booking/continue-booking.component';
@Injectable({
  providedIn: 'root'
})
export class ContinueBookingService {

  constructor(private dialog : MatDialog) {}
    open(data : any , patient? : string){
      return this.dialog.open(ContinueBookingComponent,{
        data:{data,patient}
      })
    }
   
}
