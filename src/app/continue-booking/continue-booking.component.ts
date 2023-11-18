import { Component, Inject, OnInit } from '@angular/core';
import { ContinueBookingService } from '../services/continue-booking.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
@Component({
  selector: 'app-continue-booking',
  templateUrl: './continue-booking.component.html',
  styleUrls: ['./continue-booking.component.css']
})
export class ContinueBookingComponent  implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data : any, 
  private dialog : ContinueBookingService,
  private firstDialog : DoctorDialogueService){

  }
  ngOnInit(): void {
    console.log(this.data)  
  }
  
}
