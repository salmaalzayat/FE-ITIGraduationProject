import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
  doctors?: GetAllDoctorsDto[];
constructor(private doctorService : DoctorService){}
ngOnInit():void{
this.doctorService.getDoctors().subscribe({
  next:(doctors) => {
    this.doctors = doctors;
    
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
});
}
}
