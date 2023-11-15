import { Component, Inject, OnInit } from '@angular/core';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-book-dialogue',
  templateUrl: './book-dialogue.component.html',
  styleUrls: ['./book-dialogue.component.css']
})
export class BookDialogueComponent implements OnInit{

  constructor(private dialog : DoctorDialogueService, @Inject(MAT_DIALOG_DATA) public data : any){}
  doctorById? : GetDoctorByIDDto;
  id? : string ;
  ngOnInit(): void {

    this.id = this.data.doctorId
    console.log("dfvzc" +this.data.doctorId) 
    console.log(this.data)
  }
  
}
