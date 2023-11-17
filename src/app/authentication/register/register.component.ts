import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidators } from '../../services/Password.service';
import {phoneNumberLengthValidator} from '../../services/RegisterPhoneNumber.service';
import { AuthenticationService } from '../../services/authService.service';
import {TokenDto}  from '../../Types/TokenDto';
import {RegisterPatientDto }from '../../Types/PatientRegisterDto';
import { Router } from '@angular/router';
import {CheckingPhoneNumber} from '../../services/checkingPhoneNumber.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // RegisterPatientDto: any = {};

  constructor(
    private authService : AuthenticationService ,
     private router:Router,
     private checkingPhoneNumber : CheckingPhoneNumber) {
  }

  form = new FormGroup({
    username: new FormControl<string>('',[Validators.required , Validators.minLength(3)]),
    phoneNumber: new FormControl<string>('', [Validators.required, phoneNumberLengthValidator , this.onlyNumbersValidator]),
    password: new FormControl<string>('', [
      Validators.required,
      passwordValidators['PasswordTooShort'],
      passwordValidators['PasswordRequiresNonAlphanumeric'],
      passwordValidators['PasswordRequiresDigit'],
      passwordValidators['PasswordRequiresUpper'],
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

    const phoneNumber = this.form.get('phoneNumber')?.value ?? '';
    console.log(phoneNumber);

    this.checkingPhoneNumber.checkPhoneNumberExists(phoneNumber).subscribe((exists) => {
      if (exists) {
        // Phone number already exists, handle accordingly (e.g., show error)
        console.log("phone exist")
        this.form.get('phoneNumber')?.setErrors({ phoneNumberExists: true });
        // this.form.get('phoneNumber')?.setErrors({ phoneNumberExists: true });
      } else if(!exists){
        console.log("not exist")
        const credentials = new RegisterPatientDto();
        credentials.phoneNumber = this.form.controls.phoneNumber.value ?? '';
        credentials.username = this.form.controls.username.value ?? '';
        // Assuming Name is the user's full name
        credentials.Name = this.form.controls.username.value ?? '';
        credentials.gender = this.form.controls.gender.value ?? '';
        // Assuming DateOfBirth is the user's date of birth
        credentials.DateOfBirth = this.form.controls.date.value ?? '';
        credentials.password = this.form.controls.password.value ?? '';

        this.authService.register(credentials).subscribe((tokenDto) => {
          // Registration successful, you can navigate or perform other actions
          this.router.navigateByUrl('/');
        });
      }
    });
  }






/////////////////////////////// draft

  // handleSubmit(e: Event) {
  //   e.preventDefault();

  //   const phoneNumber = this.form.get('phoneNumber')?.value;

  //   this.checkingPhoneNumber.checkPhoneNumberExists(phoneNumber).subscribe((exists) => {
  //     if (exists) {
  //       // Phone number already exists, handle accordingly (e.g., show error)
  //       this.checkingPhoneNumber.get('phoneNumber')?.setErrors({ phoneNumberExists: true });
  //     } else {

  //     }
  //   });

    // var credentials= new RegisterPatientDto();
    //   credentials.phoneNumber= this.form.controls.phoneNumber.value ?? '',
    //   credentials.username= this.form.controls.username.value ?? '',
    //   // new Name credrntial
    //   credentials.Name= this.form.controls.username.value ?? '',
    //   credentials.gender= this.form.controls.gender.value ?? '',
    //   // credentials. date= this.form.controls.date.value ?? '',
    //   //new DateOfBirth
    //   credentials.DateOfBirth= this.form.controls.date.value ?? '',
    //   credentials.password= this.form.controls.password.value ?? '',

    // this.authService.register(credentials).subscribe((tokenDto) => {
    //   // console.log(tokenDto);
    //   // console.log(credentials.phoneNumber);
    //   // console.log('credentials.gender'+ credentials.gender);
    //   // console.log('credname'+ credentials.username);
    //   // console.log('inputvalue'+this.form.controls.username.value)
    //   // console.log('Form Value:', this.form.value);
    //   // console.log('Username Value:', this.form.controls.username.value);
    //   this.router.navigateByUrl('/');
    // });
  }



















