import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidators } from '../../services/Password.service';
import {phoneNumberLengthValidator} from '../../services/RegisterPhoneNumber.service';
import { AuthenticationService } from '../../services/authService.service';
import {TokenDto}  from '../../Types/TokenDto';
import {RegisterPatientDto }from '../../Types/PatientRegisterDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // RegisterPatientDto: any = {}; 

  constructor(
    private authService : AuthenticationService ,
     private router:Router) {
  }

  form = new FormGroup({
    username: new FormControl<string>('',[Validators.required , Validators.minLength(3)]),
    phoneNumber: new FormControl<string>('', [Validators.required, phoneNumberLengthValidator , this.onlyNumbersValidator]),
    password: new FormControl<string>('', [
      Validators.required,
      passwordValidators['PasswordTooShort'],
      passwordValidators['PasswordRequiresNonAlphanumeric'],
      passwordValidators['PasswordRequiresDigit'],
      passwordValidators['PasswordRequiresUpper']
    ]),
    confirmPassword: new FormControl<string>('', [Validators.required]),
    gender: new FormControl<any> ('', [Validators.required]),
    date: new FormControl<any> ('',[Validators.required])
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
  toggleConfirmPasswordType(e:Event){
    const passwordControl = this.form.get('confirmPassword');
    if (passwordControl instanceof FormControl) {
      const confirmPasswordElement = document.getElementById('confirmPassword') as HTMLInputElement;

      if (confirmPasswordElement) {

        const confirmPasswordType = confirmPasswordElement.type;
        const newType = confirmPasswordType === 'password' ? 'text' : 'password';

        confirmPasswordElement.type = newType;
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

    var credentials= new RegisterPatientDto();
      credentials.phoneNumber= this.form.controls.phoneNumber.value ?? '',
      credentials.username= this.form.controls.username.value ?? '',
      credentials.gender= this.form.controls.gender.value ?? '',
      credentials. date= this.form.controls.date.value ?? '',
      credentials. password= this.form.controls.password.value ?? '',
       
    this.authService.register(credentials).subscribe((tokenDto) => {
      console.log(tokenDto);
      // console.log(credentials.phoneNumber);
      console.log('credentials.gender'+ credentials.gender);
      this.router.navigateByUrl('/');
    });
  }
  
  }
















