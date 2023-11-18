import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { ChildDoctorOfSpecializationDto } from '../Types/ChildDoctorOfSpecializationDto';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataBetweenDoctorCompHeroCompService } from '../services/data-between-doctor-comp-hero-comp.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { DoctorDialogueService } from '../services/doctor-dialogue.service';
import { BookDialogueComponent  } from '../book-dialogue/book-dialogue.component';
import { VisitCountDto } from '../Types/VisitCountDto';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
 
  doctors?: GetAllDoctorsDto[];
  doctorsBySpecialization?: GetDoctorsBySpecializationDto[];
  doctorById? : GetDoctorByIDDto;
  doctorBySpecialization? : GetDoctorByIDDto;
  sId : number =0;
  dId: string = '0';
  sort : string = ' '
  startDate : string = ' '
   bookingDate :  {day : string, dateOfBooking: string}[] = [];
   dates : {date : string}[]=[]
   days : {day : number }[]=[]
   visitCount? : VisitCountDto[];
  bookDoctorVisitCount : boolean = false;
  i : number = 0

visitCountsDrById : any

Visits : {drId? : string , visitrecord?: VisitCountDto[]}[]=[];
  
 constructor(private doctorService : DoctorService ,private data : DataBetweenDoctorCompHeroCompService, private _dialog: DoctorDialogueService ){}

    ngOnInit():void{ 
      this.data.currentId.subscribe(sId => this.sId = sId)
      this.data.currentDoctorId.subscribe(dId => this.dId = dId)
      //#region get all doctors
      if(this.dId == '0' && this.sId==0){
      this.doctorService.getDoctors().subscribe({
        next:(doctors) => {
          this.doctors = doctors;
          this.doctors.forEach((doctor)=>{
            
            this.getDate(doctor)
          })
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
          this.doctorsBySpecialization.forEach((doctor)=>{
            doctor.childDoctorOfSpecializations?.forEach((item)=>{
              this.doctorBySpecialization= {
                id :item.id,
                name:item.name,
                specializationName : doctor.name,
                description:item.description,
                title:item.title,
                weekSchadual:item.weekSchadual}
                this.getDate(this.doctorBySpecialization)
            })
           
          })
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
         
          this.getDate(this.doctorById)
         },
        error: (error) => {
          console.log('calling dr by id api failed', error);
        },
      });}
      //#endregion
      

      //#region DayOfWeek convert to days

      
      //#endregion
    }
    
    
    book(bookDoctor:any, date:string){
      let j =0
      this.Visits.forEach((v)=>
      {
        if(this.Visits[j].drId==bookDoctor.id){
        //  console.log(this.Visits[i])
          j++
        }
      })
      var ref = this._dialog.open(bookDoctor,date);
    }

    getDate(doctorById : GetDoctorByIDDto){
   // let i = 0
    //  let visitCountsDrById : 
    //   { 
    //     id: number;
    //    date: string;
    //    limitOfPatients: number;
    //    actualNoOfPatients: number;
    //    doctorId: string | null;
    //    weekScheduleId : number;
    //    day : number;
    //  }[] = [];

     
        
        let currentDate = new Date();
        const year : number = currentDate.getFullYear()
        const month : number = currentDate.getMonth()+1
        const day : number = currentDate.getDate()+0
         let startDate  = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`

         const endDay : number = currentDate.getDate()+7

         let endDate = `${year}-${month.toString().padStart(2,'0')}-${endDay.toString().padStart(2,'0')}`

         this.doctorService.GetVisitCountForWeek(startDate,endDate,doctorById.id).subscribe({
          next:(visitCount) => {
            this.visitCount = visitCount;
          
            console.log(this.visitCount)

            this.Visits.push({drId: doctorById.id,visitrecord:this.visitCount})
            
              console.log(this.Visits[0].visitrecord)
          },
          error: (error) => {
            console.log('calling visitCount api failed', error);
          },
          
        });  
      
        
      
      
    }

  
}


