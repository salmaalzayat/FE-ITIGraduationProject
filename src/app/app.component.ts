import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authService.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'graduation-project';
  constructor( private authService: AuthenticationService , public loadingService:LoadingService ){}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authService.isLoggedIn$.next(true);
    }
  }
}
