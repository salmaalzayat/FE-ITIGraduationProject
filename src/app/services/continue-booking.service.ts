import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContinueBookingComponent } from '../continue-booking/continue-booking.component';
import { GetPatientByPhoneDto } from '../Types/GetPatientByPhoneDto';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';
@Injectable({
  providedIn: 'root'
})
export class ContinueBookingService {

  constructor(private continueDialog : MatDialog) { }
  open(doctorDataAndDate : any , patient? :string){
    return this.continueDialog.open(ContinueBookingComponent,{data:{doctorDataAndDate,patient}})
  }
}
