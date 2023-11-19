import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContinueBookingComponent } from '../continue-booking/continue-booking.component';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { GetPatientByPhoneDto } from '../Types/GetPatientByPhoneDto';
@Injectable({
  providedIn: 'root'
})
export class ContinueBookingService {

  constructor(private dialog : MatDialog) {}
    open(doctor : GetDoctorByIDDto,date :string , patient? : GetPatientByPhoneDto){
      return this.dialog.open(ContinueBookingComponent,{
        data:{doctor,date,patient}
      })
    }
   
}
