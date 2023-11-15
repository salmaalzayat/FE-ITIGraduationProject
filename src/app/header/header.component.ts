import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authService.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarIsRegistered = false;
  constructor(private authenticationService:AuthenticationService){}
  ngOnInit(): void {
    // this.authenticationService.isRegistered$.subscribe((isRegistered) => {
    //   this.navBarIsRegistered = isRegistered;
    // });

}
}