import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {phoneNumberLengthValidator} from '../../services/RegisterPhoneNumber.service';
import { AuthenticationService } from '../../services/authService.service';
import {PatientLoginDto} from '../../Types/PatientLoginDto';
import { DoctorDialogueService } from 'src/app/services/doctor-dialogue.service';
import { ContinueBookingService } from 'src/app/services/continue-booking.service';
import { GetPatientByPhoneDto } from 'src/app/Types/GetPatientByPhoneDto';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';
  patient? : GetPatientByPhoneDto;
  patientNumber : string = ''
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private dialog : DoctorDialogueService,
    private confirmationDialog : ContinueBookingService,
    private patientService : PatientService
  ) {}
  form = new FormGroup({
    phoneNumber: new FormControl<string>('', [Validators.required, phoneNumberLengthValidator , this.onlyNumbersValidator]),
    password: new FormControl<string>('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onlyNumbersValidator(control:any) {
    const numericInputValue = control.value;
    const isValid = /^\d+$/.test(numericInputValue);

    return isValid ? null : { 'invalidNumber': true };
  }

  togglePasswordType(e:any) {
    const passwordControl = this.form.get('password');

    if (passwordControl instanceof FormControl) {
      const inputElement = document.getElementById('password') as HTMLInputElement;


      if (inputElement) {
        const currentType =inputElement.type;
        const newType = currentType === 'password' ? 'text' : 'password';
        inputElement.type = newType;
      }
    }
    const I = e.target as HTMLElement
    if(I.style.color === "rgb(63, 187, 192)"){
      I.style.color = "black"
    }else{
      I.style.color = "#3fbbc0"
    }
  }
  handleSubmit(e: Event) {
    e.preventDefault();

    var credentials = new PatientLoginDto();
    credentials.phoneNumber = this.form.controls.phoneNumber.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.login(credentials).subscribe((tokenDto) => {
      console.log(tokenDto);
      if(this.dialog.isBooking){
        this.router.navigate(['/doctor'])
        this.patientNumber = this.form.controls.phoneNumber.value!
        this.getPatient(this.patientNumber)
      }
      this.router.navigateByUrl('/');

    },
    (error) => {
      //unauthorized
      if (error.status === 401) {
        this.errorMessage = 'This password is incorrect. Please double-check your password';
      //not found
      }if (error.status === 404) { 
        this.errorMessage = 'The phone number you entered is not connected to an account.';
      }else {
        console.log('Some other error occurred:', error);
      }
    }
  );
}


getPatient(patientNumber : string){
  this.patientService.getPatientByPhoneNumber(patientNumber!).subscribe({
    next:(patient) => {
      this.patient = patient 
      this.router.navigate(['/doctor'])

      this.confirmationDialog.open(this.dialog.dataForLoginRegister.data, this.dialog.dataForLoginRegister.date,this.patient)

    },
    error: (error) => {
   
     console.log('calling Patient api failed', error)
     },
  }); 

}
}