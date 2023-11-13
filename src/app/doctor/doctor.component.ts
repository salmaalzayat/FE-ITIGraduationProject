import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { DoctorsBySpecializationService } from '../services/doctors-by-specialization.service';
import { ChildDoctorOfSpecializationDto } from '../Types/ChildDoctorOfSpecializationDto';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataBetweenDoctorCompHeroCompService } from '../services/data-between-doctor-comp-hero-comp.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
 

  doctors?: GetAllDoctorsDto[];
  doctorsBySpecialization?: GetDoctorsBySpecializationDto[];
  sId : number =0;

constructor(private doctorService : DoctorService , private doctorsBySpecializationService : DoctorsBySpecializationService,private data : DataBetweenDoctorCompHeroCompService){}

ngOnInit():void{

this.data.currentId.subscribe(sId => this.sId = sId)
this.doctorService.getDoctors().subscribe({
  next:(doctors) => {
    this.doctors = doctors;
    
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
});

//#region doctor by specialization
this.doctorsBySpecializationService.getDoctorsBySpecialization(this.sId).subscribe({

  next:(doctorsBySpecialization) => {
    this.doctorsBySpecialization = doctorsBySpecialization;
    console.log("in dr comp " + this.sId)


  },
  error: (error) => {
    console.log('calling api failed', error);
  },
});
}
//#endregion
}
