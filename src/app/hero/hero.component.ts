import { Component, OnInit , Input } from '@angular/core';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { DoctorService } from '../services/doctor.service';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { SpecializationService } from '../services/specialization.service';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataBetweenDoctorCompHeroCompService } from '../services/data-between-doctor-comp-hero-comp.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { GetDoctorByIdService } from '../services/get-doctor-by-id.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  sId : number =0;
  dId! : string;
  doctorById?: GetDoctorByIDDto;
  doctorId: string = '0';

constructor(private doctorService : DoctorService , private specializationService: SpecializationService, private router:Router, private data : DataBetweenDoctorCompHeroCompService, private doctorByIdService : GetDoctorByIdService){}
ngOnInit():void{

this.data.currentId.subscribe(sId => this.sId = sId)
this.data.currentDoctorId.subscribe(dId => this.dId = dId)
this.doctorService.getDoctors().subscribe({
  next:(doctors) => {
    this.doctors = doctors;
  },
  error: (error) => {
    console.log('calling All doctors api failed', error);
  },
});
this.specializationService.GetAllSpecializations().subscribe({
  next:(specializations) => {
    this.specializations = specializations;
  },
  error: (error) => {
    console.log('calling All specializations api failed', error);
  },
})
}
id: any;
Doctors? : DoctorsForAllSpecializations[];
isSpecializationSelected: boolean = false;

selected(e: Event):void{
  this.isSpecializationSelected = true;
  this.id = (e.target as any).value;
  if(this.id === "All"){
    this.isSpecializationSelected = false;
  }
  this.Doctors = this.specializations?.find(s => s.id == this.id)?.doctorsForAllSpecializations!
}


isDoctorSelected : boolean =false;


doctorSelected(event: Event):void{


this.doctorId = (event.target as HTMLSelectElement).value;
this.isDoctorSelected = true;
if(this.doctorId == "allDoctors"){
  this.isDoctorSelected = false;
}

}
onSearch(event : Event): void {

  if(this.isSpecializationSelected)
  {
    this.data.changeSpecializationId(this.id)
   
  }

  if(this.isDoctorSelected){
    this.data.changeDoctorId(this.doctorId)
  }

  
  this.router.navigate(['/doctor'])
}
}
