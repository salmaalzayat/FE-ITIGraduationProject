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
import { BookDialogue2Service } from '../services/book-dialogue-2.service';
import { BookDialog2Component } from '../book-dialog2/book-dialog2.component';

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
  visitCountsModal : 
  {id: number;
   date: string;
   limitOfPatients: number;
   actualNoOfPatients: number;
   doctorId: string | null;
   weekScheduleId : number;
   day : number;
 }[] = [];
 visitCountsDrById : 
 {id: number;
  date: string;
  limitOfPatients: number;
  actualNoOfPatients: number;
  doctorId: string | null;
  weekScheduleId : number;
  day : number;
}[] = [];
 bookedDate : string = ' '
  constructor(private dialog : DoctorDialogueService,
     @Inject(MAT_DIALOG_DATA) public data : any ,
      private PatientService : PatientService, 
      private doctorService : DoctorService,
      private _dialog2: BookDialogue2Service){}
 
  ngOnInit(): void {

    
    // for(let i = 0 ; i < 7 ; i++){
    //   let currentDate = new Date();
    //   const year : number = currentDate.getFullYear()
    //   const month : number = currentDate.getMonth()+1
    //   const day : number = currentDate.getDate()+i
    //   const formattedDate : string = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`
     
    //   this.doctorService.GetVisitCount(formattedDate,this.data.data.id).subscribe({
    //     next:(visitCount) => {
    //       this.visitCount = visitCount;
    //        console.log(formattedDate)
    //       console.log(this.doctorById?.weekSchadual)

    //        console.log(visitCount)
    //        this.visitCountsDrById?.push(visitCount)
    //        console.log(this.visitCountsDrById)
           
    //     },
    //     error: (error) => {
         
    //       console.log('calling visitCount api failed', error);
    //     },
    //   });}
  
  //  console.log(this.data.visitCount)

  
  }
  //#endregion

  Form = new FormGroup({
    phoneNumber : new FormControl<string>('')
  });


  handleSubmit(e: Event){
    e.preventDefault;
  }

  confirm(e: Event , doctorDataAndDate: any){
    console.log(this.data)
    var ref = this._dialog2.open(doctorDataAndDate)
  }

  getPhoneNumber(e: Event){
    this.patientAlreadyBooked = false;
    this.patientRegistered= false;

    let day = this.data.date.split('/')[1]
    let month = this.data.date.split('/')[0]
    let year = this.data.date.split('/')[2]
    console.log(day)
    let formattedDate  = `${year}-${month}-${day}`

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

    this.PatientService.GetAllPatientWithVisitDate(formattedDate,this.data.data.id).subscribe({
      next:(getAllPatientsWithDate) => {
        this.getAllPatientsWithDate = getAllPatientsWithDate;
        this.getAllPatientsWithDate?.forEach((patient)=>{
          if(patient.patientId==this.PatientByPhoneNumber?.id){
            this.patientAlreadyBooked = true;
            
            console.log(this.PatientByPhoneNumber.id)
            this.bookedDate=formattedDate
            console.log(this.bookedDate)

          }
        })
      },
      error: (error) => {
       
        console.log('calling get patients with date api failed', error);
      },
    }); 

   
  }

  // onContinue($){
  //   var ref = this.dialog2.open()
  // }
}
