import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { DoctorsBySpecializationService } from '../services/doctors-by-specialization.service';
import { ChildDoctorOfSpecializationDto } from '../Types/ChildDoctorOfSpecializationDto';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
 

  doctors?: GetAllDoctorsDto[];
  doctorsBySpecialization?: GetDoctorsBySpecializationDto[];
constructor(private doctorService : DoctorService , private doctorsBySpecializationService : DoctorsBySpecializationService){}
ngOnInit():void{
this.doctorService.getDoctors().subscribe({
  next:(doctors) => {
    this.doctors = doctors;
    
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
});
//#region doctor by specialization
this.doctorsBySpecializationService.getDoctorsBySpecialization().subscribe({
  next:(doctorsBySpecialization) => {
    this.doctorsBySpecialization = this.doctorsBySpecialization;
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
});
}
//#endregion
}
