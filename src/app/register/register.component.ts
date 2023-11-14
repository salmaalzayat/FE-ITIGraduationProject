import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidators } from '../services/Password.service';
import {phoneNumberLengthValidator} from '../services/RegisterPhoneNumber.service';
import { AuthenticationService } from '../services/authService.service';
import  TokenDto  from '../Types/TokenDto';
import RegisterPatientDto from '../Types/PatientRegisterDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegisterPatientDto: any = {}; // Use the appropriate type for your registration data

  constructor(private authService : AuthenticationService , private router:Router) {

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
    const isValid = /^\d+$/.test(numericInputValue); // Use a regular expression to check for numeric input

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

  // register() {
  //   console.log(this.RegisterPatientDto);
  //   this.registrationService.register(this.RegisterPatientDto).subscribe(
  //     (response: TokenDto) => {
  //       console.log('Registration successful', response);
  //       // Handle success, e.g., redirect to another page
  //       const token = response.token;
  //       console.log(token);
  //       // Do something with the token, such as storing it in local storage
  //     },
  //     (error) => {
  //       console.error('Registration failed', error);
  //       console.log(this.RegisterPatientDto.Name)
  //           console.log(this.RegisterPatientDto.password)
  //           console.log(this.RegisterPatientDto.date)
  //           console.log(this.RegisterPatientDto.gender)
  //           console.log(this.RegisterPatientDto.phoneNumber)

  //       // Handle error, e.g., display an error message
  //     }
  //   );
  // }
  handleSubmit(e: Event) {
    e.preventDefault();

    var credentials = new this.RegisterPatientDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.login(credentials).subscribe((TokenDto) => {
      console.log(TokenDto);
      this.router.navigateByUrl('/');
    });
  }

}














