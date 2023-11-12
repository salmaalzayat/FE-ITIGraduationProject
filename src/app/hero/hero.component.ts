import { Component, OnInit } from '@angular/core';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { DoctorService } from '../services/doctor.service';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { SpecializationService } from '../services/specialization.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
constructor(private doctorService : DoctorService , private specializationService: SpecializationService){}
ngOnInit():void{
this.doctorService.getDoctors().subscribe({
  next:(doctors) => {
    this.doctors = doctors;
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
});
this.specializationService.GetAllSpecializations().subscribe({
  next:(specializations) => {
    console.log(specializations);
    this.specializations = specializations;
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
})
}
id: number = 0;
doctorss = [];

selected(e: Event):void{
  this.id = (e.target as any).value;
  console.log(this.id);
}
}
