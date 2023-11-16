import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authService.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarisLoggedIn = false;
  constructor(private authenticationService:AuthenticationService){}

  logout(): void {
    this.authenticationService.logout();
  }
  ngOnInit(): void {
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.navBarisLoggedIn = isLoggedIn;
    });
  

}
}


