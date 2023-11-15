import { Component, Inject, OnInit } from '@angular/core';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDTO';
import { PatientService } from '../services/patient.service';
import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';

@Component({
  selector: 'app-book-dialogue',
  templateUrl: './book-dialogue.component.html',
  styleUrls: ['./book-dialogue.component.css']
})
export class BookDialogueComponent implements OnInit{

  constructor(private dialog : DoctorDialogueService, @Inject(MAT_DIALOG_DATA) public data : any , private PatientService : PatientService){}
  doctorById? : GetDoctorByIDDto;
  id? : string ;

  PatientByPhoneNumber? : GetPatientByPhoneDTO;
  PatientPhoneNumber? : string;
  ngOnInit(): void {
   console.log(this.data)
  }
  
  Form = new FormGroup({
    phoneNumber : new FormControl<string>('')
  });

  // patientVisit :AddPatientVisitDto =  {
  //   dateOfVisit : this.data.date,
  //   doctorId : this.data.date,
  //   patientId : this.PatientByPhoneNumber!.id,
  //   weekSchedule : this.data.weekSchedule
  // }

  handleSubmit(e: Event){
    e.preventDefault;
    
   
    this.PatientService.getPatientByPhoneNumber(this.PatientPhoneNumber!).subscribe({
      next:(PatientByPhoneNumber) => {
        this.PatientByPhoneNumber = PatientByPhoneNumber;
      },
      error: (error) => {
        console.log('calling Patient api failed', error);
      },
    }); 
    // this.PatientService.addPatientVisit()

  }
  getPhoneNumber(e: Event){
    this.PatientPhoneNumber = (e.target as HTMLInputElement).value;
  }
}
