import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authService.service';
import {PatientLoginDto} from '../../Types/PatientLoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  form = new FormGroup({
    phoneNumber: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  handleSubmit(e: Event) {
    e.preventDefault();

    var credentials = new PatientLoginDto();
    credentials.phoneNumber = this.form.controls.phoneNumber.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.login(credentials).subscribe((tokenDto) => {
      console.log(tokenDto);
      this.router.navigateByUrl('/');
      // this.authService.isLoggedIn$.next(true);
      // localStorage.setItem('token',tokenDto.token);
    });
  }
}