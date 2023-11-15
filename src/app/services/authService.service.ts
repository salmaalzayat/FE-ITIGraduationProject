
import { Injectable } from '@angular/core';
import {RegisterPatientDto }from '../Types/PatientRegisterDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {TokenDto}   from '../Types/TokenDto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // public isRegistered$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {}

  public register(credentials: RegisterPatientDto): Observable<TokenDto> {
    console.log('Credentials:', credentials);
    return this.client
      .post<TokenDto>('https://localhost:7267/api/Patient/register', credentials)
      .pipe(
        tap((tokenDto) => {
          // this. isRegistered$.next(true);
          localStorage.setItem('token', tokenDto.token);
          console.log('credentials.gender'+ credentials.gender);
          console.log('credentials.phoneNumber'+ credentials.phoneNumber);
          console.log('credentials.username'+ credentials.username);
          console.log('credentials.date'+ credentials.date);
        })
      );
  }
}
