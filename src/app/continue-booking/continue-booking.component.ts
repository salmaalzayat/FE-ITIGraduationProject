import { Component, Inject } from '@angular/core';
import { ContinueBookingService } from '../services/continue-booking.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';

@Component({
  selector: 'app-continue-booking',
  templateUrl: './continue-booking.component.html',
  styleUrls: ['./continue-booking.component.css']
})
export class ContinueBookingComponent {

  constructor(private continueBookService : ContinueBookingService,
    @Inject(MAT_DIALOG_DATA) public data : any ,
    private firstDialog : BookDialogueComponent){
  
  }
    ngOnInit(): void {
      console.log(this.data)
    }
}
