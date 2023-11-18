import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {phoneNumberLengthValidator} from '../../services/RegisterPhoneNumber.service';
import { AuthenticationService } from '../../services/authService.service';
import {PatientLoginDto} from '../../Types/PatientLoginDto';
import { DoctorDialogueService } from 'src/app/services/doctor-dialogue.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorMessage: string = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private bookDialog : DoctorDialogueService
  ) {}
  ngOnInit(): void {
    if(this.bookDialog.booked){
      console.log(this.bookDialog.booked)
      this.bookDialog.close()
      console.log(this.bookDialog.dataa)
    }
  }
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
       if(this.bookDialog.booked){
        this.router.navigate(['/doctor'])
        }else{
          this.router.navigateByUrl('/');
        }
      
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
    //if(this.bookDialog.booked){
      this.router.navigate(['/doctor'])
    //}
  }
}