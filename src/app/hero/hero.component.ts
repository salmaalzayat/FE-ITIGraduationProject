import { Component, OnInit , Input } from '@angular/core';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { DoctorService } from '../services/doctor.service';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { SpecializationService } from '../services/specialization.service';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';


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
    this.specializations = specializations;
  },
  error: (error) => {
    console.log('calling api failed', error);
  },
})
}
id: number = 0;
doctorss? : Array<string>;
spa? : DoctorsForAllSpecializations[];

selected(e: Event):void{
  this.id = (e.target as any).value;
  this.doctorss = (e.target as any).doctorss;
  this.doctorss = (e.target as any).DoctorsOfSpecialization;
  console.log(this.id);
  for(let sp of this.specializations!)
  {
    if(sp.id == this.id){
      this.spa = sp.doctorsForAllSpecializations!;
      console.log(sp.doctorsForAllSpecializations);
    }
  }
}
}
