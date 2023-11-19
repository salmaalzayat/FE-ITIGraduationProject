import { Component, Inject, OnInit } from '@angular/core';
import { ContinueBookingService } from '../services/continue-booking.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { BookDialogueComponent } from '../book-dialogue/book-dialogue.component';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { PatientService } from '../services/patient.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDto';
@Component({
  selector: 'app-continue-booking',
  templateUrl: './continue-booking.component.html',
  styleUrls: ['./continue-booking.component.css']
})
export class ContinueBookingComponent  implements OnInit{


  
  constructor(@Inject(MAT_DIALOG_DATA) public data : any, 
  private dialog : ContinueBookingService,
  private firstDialog : DoctorDialogueService,
  private patientService : PatientService){
   
  }
  ngOnInit(): void {
    console.log(this.data.patient.name )  
  }
  bookVisit(doctor: GetDoctorByIDDto, patient : GetPatientByPhoneDTO, date : string){
    let day  = date.split('/')[1]
    let month = date.split('/')[0]
    let year = date.split('/')[2]
    let formattedDate  = `${year}-${month}-${day}`
    const addPatientVisit : AddPatientVisitDto={
      doctorId : doctor.id,
      patientId : patient.id,
      dateOfVisit : formattedDate,
    }
    console.log(addPatientVisit.dateOfVisit)
    this.patientService.addPatientVisit(addPatientVisit).subscribe({
      next :  ()=>{
        console.log("done")
      },

      error:(error)=>{
        console.error("calling addVisit api failed",error);
      }
        
      });
      
    }
}

