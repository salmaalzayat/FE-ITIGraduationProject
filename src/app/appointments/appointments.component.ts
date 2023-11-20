// appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appiontment.service';
import GetPatientVisitDto from '../Types/GetPatientVisitDto';
import { Observable } from 'rxjs';
import  {GetPatientVisitsChildDto}  from '../Types/GetPatientVisitsChildDto';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  // appointments: {name:string , patientVisits : GetPatientVisitsChildDto[]}[] = []; // Use the DTO type for appointments
  appointments: any = []; // Use the DTO type for appointments
  phoneNumber: string = '';
  doctorID : string = '';
  doctor? : GetDoctorByIDDto;
  patientVisits: GetPatientVisitsChildDto[] = [];
  currentDate: Date = new Date();

  constructor(private appointmentService: AppointmentService , private doctorService : DoctorService) {}

  ngOnInit(): void {
    // Fetch phone number from local storage
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.phoneNumber = userData.phoneNumber;

      if (this.phoneNumber) {
        this.loadAppointments(this.phoneNumber).subscribe((data) => {
          this.appointments = data;
          console.log(data)
          const dataArray = Object.values(data);
          console.log(dataArray);
          this.appointments =dataArray;
          console.log('Appointments loaded:', this.appointments[1].length);
          this.appointments[1].forEach((e:any)=>{
            console.log(e)
            console.log("sajbdkjasbdkjasb")
            this.doctorID = e.doctorId;
            this.doctorService.getDoctorById(this.doctorID).subscribe((d)=>{
              this.doctor = d;
              console.log(this.doctor.name)
            })

          });
          if (this.appointments[1].length > 0) {
            console.log('First appointment name:', this.appointments[1]);
            console.log('First appointment length:', this.appointments[1].length);

            // Accessing patient visits of the first appointment
            const patientVisits = this.appointments[1];
            if (patientVisits.length > 0) {
              console.log('First patient visit date:', patientVisits[0].dateOfVisit);
              console.log('First patient visit comments:', patientVisits[0].comments);
            }
          }
        });
      } else {
        console.error('Phone number not found in local storage.');
      }
    } else {
      console.error('User data not found in local storage.');
    }
  }

  // Function to load appointments from the API
  loadAppointments(phoneNumber: string): Observable<GetPatientVisitDto[]> {
    return this.appointmentService.getAppointmentsByPhoneNumber(phoneNumber);
  }
  isFutureVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    return visitDate > currentDate;
  }

  isTodayVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    return visitDate.toDateString() === currentDate.toDateString();
  }

  isPastVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    return visitDate < currentDate;
  }
  get sortedAppointments(): any[] {
    // Assuming appointments[1] is an array of appointments
    return this.appointments[1].sort((a: any, b: any) => {
      const dateA = new Date(a.dateOfVisit);
      const dateB = new Date(b.dateOfVisit);
      return dateB.getTime() - dateA.getTime();
    });
  }
}



