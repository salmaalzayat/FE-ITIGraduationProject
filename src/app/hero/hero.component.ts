import { Component, OnInit } from '@angular/core';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
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
