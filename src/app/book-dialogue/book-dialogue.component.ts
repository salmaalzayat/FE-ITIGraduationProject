import { Component, Inject, OnInit } from '@angular/core';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDTO';
import { PatientService } from '../services/patient.service';
import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';
import { DoctorService } from '../services/doctor.service';
import { VisitCountDto } from '../Types/VisitCountDto';
import { GetAllPatientsWithDateDto } from '../Types/GetAllPatientWithDateDto';

@Component({
  selector: 'app-book-dialogue',
  templateUrl: './book-dialogue.component.html',
  styleUrls: ['./book-dialogue.component.css']
})
export class BookDialogueComponent implements OnInit{
  doctorById? : GetDoctorByIDDto;
  id? : string ;
  visitCount? : VisitCountDto;
  PatientByPhoneNumber? : GetPatientByPhoneDTO;
  PatientPhoneNumber? : string;
  getAllPatientsWithDate?: GetAllPatientsWithDateDto[];
  patientAlreadyBooked : boolean = false;
  patient? : GetAllPatientsWithDateDto;
  patientRegistered? : boolean = false;
  constructor(private dialog : DoctorDialogueService, @Inject(MAT_DIALOG_DATA) public data : any , private PatientService : PatientService, private doctorService : DoctorService){}
 
  ngOnInit(): void {
   
 //#region  visit count
        this.doctorService.GetVisitCount("2023-11-16",this.data.id).subscribe({
      next:(visitCount) => {
        this.visitCount = visitCount;
      //  console.log(visitCount)
      },
      error: (error) => {
       
        console.log('calling visitCount api failed', error);
      },
    });  }
  //#endregion

  Form = new FormGroup({
    phoneNumber : new FormControl<string>('')
  });

  // patientVisit :AddPatientVisitDto =  {
  //   dateOfVisit : this.data.date,
  //   doctorId : this.data.date,
  //   patientId : this.PatientByPhoneNumber!.id,
  // }

  handleSubmit(e: Event){
    e.preventDefault;
    // const patientVisit :AddPatientVisitDto =  {
    //   dateOfVisit : this.data.date,
    //   doctorId : this.data.date,
    //   patientId : this.PatientByPhoneNumber!.id,
    // }
    // this.PatientService.addPatientVisit()

  }

  getPhoneNumber(e: Event){
    this.patientAlreadyBooked = false;
    this.patientRegistered= false;

    this.PatientPhoneNumber = (e.target as HTMLInputElement).value;
    
    this.PatientService.getPatientByPhoneNumber(this.PatientPhoneNumber!).subscribe({
      next:(PatientByPhoneNumber) => {
        this.PatientByPhoneNumber = PatientByPhoneNumber;
        this.patientRegistered = true;
      },
      error: (error) => {
       console.log('calling Patient api failed', error);
       this.PatientByPhoneNumber = {
        id : ' ',
        name : ' ',
        phoneNumber: ' ',
        dateOfBirth : ' ',
        gender : ' '

      }
      },
    }); 

    this.PatientService.GetAllPatientWithVisitDate("2023-11-16",this.data.id).subscribe({
      next:(getAllPatientsWithDate) => {
        this.getAllPatientsWithDate = getAllPatientsWithDate;
        this.getAllPatientsWithDate?.forEach((patient)=>{
          if(patient.patientId==this.PatientByPhoneNumber?.id){
            this.patientAlreadyBooked = true;
            console.log("ana gowa ")
            console.log(this.PatientByPhoneNumber.id)

          }
        })
      },
      error: (error) => {
       
        console.log('calling get patients with date api failed', error);
      },
    }); 

   
  }
}
