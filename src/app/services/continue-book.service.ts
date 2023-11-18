import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContinueBookComponent } from '../continue-book/continue-book.component';
import { DoctorDialogueService } from './doctor-dialogue.service';
import { GetPatientByPhoneDto } from '../Types/GetPatientByPhoneDto';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';

@Injectable({
  providedIn: 'root'
})
export class ContinueBookService {
data?:any;
  constructor(private continueDialog : MatDialog,
     private doctorDialogService : DoctorDialogueService) {}
    open(doctorDataAndDate : any, patient? : string){
        return this.continueDialog.open(ContinueBookComponent,{
          data:{doctorDataAndDate,patient}
        })
    }
   
}
