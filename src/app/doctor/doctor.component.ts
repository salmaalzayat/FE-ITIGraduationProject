import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { ChildDoctorOfSpecializationDto } from '../Types/ChildDoctorOfSpecializationDto';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataBetweenDoctorCompHeroCompService } from '../services/data-between-doctor-comp-hero-comp.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
 

      doctors?: GetAllDoctorsDto[];
      doctorsBySpecialization?: GetDoctorsBySpecializationDto[];
      doctorById? : GetDoctorByIDDto;
      sId : number =0;
      dId: string = '0';

 constructor(private doctorService : DoctorService ,private data : DataBetweenDoctorCompHeroCompService, private _dialog: DoctorDialogueService ){}

    ngOnInit():void{

      this.data.currentId.subscribe(sId => this.sId = sId)
      this.data.currentDoctorId.subscribe(dId => this.dId = dId)
      //#region get all doctors
      if(this.dId == '0' && this.sId==0){
      this.doctorService.getDoctors().subscribe({
        next:(doctors) => {
          this.doctors = doctors;
          
        },
        error: (error) => {
          console.log('calling  all doctors api failed', error);
        },
      });
      }
      //#endregion
      //#region doctors by specialization

      if(this.sId !=0 && this.dId=='0'){
      this.doctorService.getDoctorsBySpecialization(this.sId).subscribe({

        next:(doctorsBySpecialization) => {
          this.doctorsBySpecialization = doctorsBySpecialization;
        },
        error: (error) => {
          console.log('calling get drs by specialization api failed', error);
        },
      });
      }
      //#endregion
      //#region doctor by id
      if(this.dId!='0'){
        this.doctorService.getDoctorById(this.dId).subscribe({

        next:(doctorById) => {
          this.doctorById = doctorById;
        
        },
        error: (error) => {
          console.log('calling dr by id api failed', error);
        },
      });}
      //#endregion
      
    }
    book(bookDoctor : GetDoctorByIDDto){
      //open the dialog
      console.log("mayar")
      var ref = this._dialog.open({D:bookDoctor});
      console.log(bookDoctor)
      //close the dialog
    }

}


