import { Component, OnInit } from '@angular/core';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';

@Component({
  selector: 'app-book-dialogue',
  templateUrl: './book-dialogue.component.html',
  styleUrls: ['./book-dialogue.component.css']
})
export class BookDialogueComponent implements OnInit{
  constructor(private dialog : DoctorDialogueService){}
  ngOnInit(): void {
    console.log("gowa")
  }
  
}
