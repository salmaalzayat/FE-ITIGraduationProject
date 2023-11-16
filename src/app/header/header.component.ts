import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authService.service';
import { PatientLoginDto } from '../Types/PatientLoginDto';
import { RegisterPatientDto } from '../Types/PatientRegisterDto';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarisLoggedIn = false;
  username: string = '';
  constructor(private authenticationService:AuthenticationService){}

  logout(): void {
    this.authenticationService.logout();
  }
  ngOnInit(): void {
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.navBarisLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.username = this.authenticationService.getUsername(); // Replace with your actual method to get the username
      console.log("comp:" + this.username)
      }
    });

}
}


