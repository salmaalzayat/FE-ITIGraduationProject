// appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appiontment.service';
import GetPatientVisitDto from '../Types/GetPatientVisitDto';
import { Observable } from 'rxjs';
import  {GetPatientVisitsChildDto}  from '../Types/GetPatientVisitsChildDto';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import VisitReviewAndRateDto from '../Types/VisitReviewAndRateDto';

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
  rate: number = 0 ;
  review: string = '';
  formSubmitted: boolean = false;

  constructor(private appointmentService: AppointmentService , private doctorService : DoctorService , private reviewService: ReviewService) {}


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
            this.rate = e.rate;
            this.review = e.review;
          //    const savedRate = localStorage.getItem(`rate_${e.id}`);
          // if (savedRate) {
          //   this.setRating(+savedRate);
          // }
            // if(this.rate){
            //   this.setRating(this.rate);
            //   // console.log("this.rate:"+ this.rate)
            //   // let stars = Array.from(document.getElementsByClassName("fa-star"));
            //   // console.log("stars:"+ stars)
            //   // console.log("stars:"+ document.getElementsByClassName("fa-star"))
            //   // for (let i = 0; i < stars.length; i++) {
            //   //   if (i < this.rate) {
            //   //     stars[i].classList.add('filled-star');
            //   //   } else {
            //   //     stars[i].classList.remove('filled-star');
            //   //   }
            //   // }
            // }
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
    return visitDate.toDateString() > currentDate.toDateString();
  }

  isTodayVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    // console.log(currentDate.toDateString());
    // console.log(visitDate.toDateString());
    return visitDate.toDateString() === currentDate.toDateString();
  }

  isPastVisit(dateOfVisit: string): boolean {
    const visitDate = new Date(dateOfVisit);
    const currentDate = new Date();
    return visitDate.toDateString() < currentDate.toDateString();
  }
  get sortedAppointments(): any[] {
    // Assuming appointments[1] is an array of appointments
    return this.appointments[1].sort((a: any, b: any) => {
      const dateA = new Date(a.dateOfVisit);
      const dateB = new Date(b.dateOfVisit);
      return dateB.getTime() - dateA.getTime();
    });
  }

  form = new FormGroup({
    rate: new FormControl<number>(0 , []),
    review: new FormControl<string>('',[])
  })

  getf(){
    console.log(this.form.controls)
  }

  clickHandle(e: Event , id:string) {
    const rate: number | null = this.form.controls.rate.value;
    const review: string | null = this.form.controls.review.value;
    const appointmentIndex = this.appointments[1].findIndex((appointment: any) => appointment.id === id);
      this.appointments[1][appointmentIndex].review = review;
    // const visitId : int | null = e.Id;
    console.log(this.appointments[1].Id);
    if ((rate !== null && this.form.controls.rate.valid)&& (review !== null && this.form.controls.review.valid)) {
      console.log(rate);
      console.log(review);
      console.log(id);
      const appointmentIndex = this.appointments[1].findIndex((appointment: any) => appointment.id === id);
      this.appointments[1][appointmentIndex].review = review;

      const reviewDto: VisitReviewAndRateDto = {
        id: +id,  // Assuming id is the property in VisitReviewAndRateDto
        rate: rate,
        review: review,
      };
      this.reviewService.postRateAndReview(reviewDto).subscribe(()=>
      {
        console.log(reviewDto);
      });
      // Do something with the rate value, if needed
    } else {
      // Handle the case where the rate is null or the form control is not valid
      console.error('Rate is either null or not valid');
    }

    this.formSubmitted = true;
  }

  setRating(star: number) {
    this.form.controls.rate.setValue(star);
    let stars = Array.from(document.getElementsByClassName("fa-star"));
    // let starss =
    console.log("star in fn: " + star)
    console.log("stars in fn: " +stars)
    for (let i = 0; i < stars.length; i++) {
      if (i < star) {
        stars[i].classList.add('filled-star');
      } else {
        stars[i].classList.remove('filled-star');
      }
    }
  }
}



