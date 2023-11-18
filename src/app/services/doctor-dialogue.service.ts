import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from './doctor.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';
import { LoginComponent } from '../authentication/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorDialogueService {
  data?:any;
  constructor(private dialog : MatDialog, 
    private doctorService : DoctorService,
    ) { }
  open(data: any,date:any){
   return this.dialog.open(BookDialogueComponent,{
    data:{data,date}
   });
  }
  close(){
    this.dialog.closeAll()
  }

  booked?: boolean = false;
  dataa?:any;
  openLogin(data:any , booked : boolean){
    this.dataa = data;
    this.booked = booked;
  }
}
