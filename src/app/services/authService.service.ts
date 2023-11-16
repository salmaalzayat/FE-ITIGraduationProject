
import { Injectable } from '@angular/core';
import {RegisterPatientDto }from '../Types/PatientRegisterDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {TokenDto}   from '../Types/TokenDto';
import { HttpClient } from '@angular/common/http';
import { PatientLoginDto } from '../Types/PatientLoginDto';
import { Router } from '@angular/router';
import{PatientDataService} from '../services/PatientDataService';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
 
  constructor(private client: HttpClient ,private router:Router, private  atientDataService: PatientDataService) {}

  public register(credentials: RegisterPatientDto): Observable<TokenDto> {
    console.log('Credentials:', credentials);
    return this.client
      .post<TokenDto>('https://localhost:7267/api/Patient/register', credentials)
      .pipe(
        tap((tokenDto) => {
          // this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);
          // console.log('credentials.gender'+ credentials.gender);
          // console.log('credentials.phoneNumber'+ credentials.phoneNumber);
          // console.log('credentials.username'+ credentials.username);
          // console.log('credentials.date'+ credentials.date);
        })
      );
  }
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public login(credentials: PatientLoginDto): Observable<TokenDto> {
    console.log('Credentials:', credentials);
    return this.client
      .post<TokenDto>('https://localhost:7267/api/Patient/login', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);
        })
      );
  }
  public logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
  }
}
