import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidators } from '../services/Password.service';
import {phoneNumberLengthValidator} from '../services/RegisterPhoneNumber.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl<number>(0, [Validators.required, phoneNumberLengthValidator]),
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


}














