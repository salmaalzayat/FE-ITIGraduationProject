
import { Injectable } from '@angular/core';
import {RegisterPatientDto }from '../Types/PatientRegisterDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {TokenDto}   from '../Types/TokenDto';
import { HttpClient } from '@angular/common/http';
import { PatientLoginDto } from '../Types/PatientLoginDto';
import { Router } from '@angular/router';
import{PatientDataService} from '../services/PatientDataService';
import { switchMap, catchError } from 'rxjs/operators';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  constructor(private client: HttpClient ,private router:Router, private  atientDataService: PatientDataService) {}
  private username: string = '';


  public register(credentials: RegisterPatientDto): Observable<TokenDto> {
    console.log('Credentials:', credentials);
    this.username = credentials.Name;
    localStorage.setItem('username', this.username);
    return this.client
      .post<TokenDto>('https://localhost:7267/api/Patient/register', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);

          // console.log('Credentials:', credentials);
        })
      );

  }
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public login(credentials: PatientLoginDto): Observable<TokenDto> {
    console.log('Credentials:', credentials);

    return this.client
      .post<TokenDto>('https://localhost:7267/api/Patient/login', credentials)
      .pipe(
        switchMap((tokenDto) => {
          return this.fetchUserData(credentials.phoneNumber).pipe(
            map((userData) => {

              this.username = userData.name;
              localStorage.setItem('username', this.username);
              // console.log('saved username from local storage:', this.username);
              localStorage.setItem('token', tokenDto.token);
              return tokenDto;
            })
          );
        }),
        tap(() => {
          this.isLoggedIn$.next(true);

          const storedUsername = localStorage.getItem('username');
          // console.log('Retrieved username from local storage:', storedUsername);

        })
      );
  }

  private fetchUserData(phoneNumber: string): Observable<any> {
    return this.client.get(`https://localhost:7267/api/Patient/patient/${phoneNumber}`);
  }


  public logout(): void {
    this.username = '';
    this.isLoggedIn$.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username')
  }
  public getUsername(): string {
    console.log('us:'+this.username)
    return this.username;
  }

}











///////////////////////////   Draft /////////////////////////////////

///1st

  // public login(credentials: PatientLoginDto): Observable<TokenDto> {
  //   console.log('Credentials:', credentials);
  //   // this.username = credentials.Name;
  //   return this.client
  //     .post<TokenDto>('https://localhost:7267/api/Patient/login', credentials)
  //     .pipe(
  //       tap(() => {
  //       const x = this.fetchUserData(credentials.phoneNumber)
  //       console.log("returnthe fetch: " + x );
  //     }),
  //       tap((tokenDto) => {
  //         this.isLoggedIn$.next(true);
  //         localStorage.setItem('token', tokenDto.token);
  //         // this.fetchUserData(credentials.phoneNumber);
  //       })
  //     );
  // }

  // private fetchUserData(phoneNumber:string): void {
  //   // Assuming there is an API endpoint to fetch user data including the name
  //   this.client.get(`https://localhost:7267/api/Patient/patient/${phoneNumber}`).subscribe(
  //     (userData: any) => {
  //       // Assuming the server response includes a 'name' property
  //       this.username = userData.name;
  //       console.log("loginfetch:"+userData.name)
  //       return this.username
  //     },
  //     (error) => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }

//////////////////////////////////////////////////////


  ///////2nd
  // public login(credentials: PatientLoginDto): Observable<TokenDto> {
  //   console.log('Credentials:', credentials);

  //   return this.client
  //     .post<TokenDto>('https://localhost:7267/api/Patient/login', credentials)
  //     .pipe(
  //       switchMap((tokenDto) => {
  //         return this.fetchUserData(credentials.phoneNumber).pipe(
  //           tap(() => {
  //             console.log("return the fetch: " + this.username);
  //           })
  //         );
  //       }),
  //       tap(() => {
  //         this.isLoggedIn$.next(true);
  //         localStorage.setItem('token', TokenDto.token);
  //         // Rest of your login logic...
  //       })
  //     );
  // }
  /////////////////////

    ///2nd
  // fetchUserData(phoneNumber: string): Observable<string> {
  //   return this.client.get(`https://localhost:7267/api/Patient/patient/${phoneNumber}`).pipe(
  //     map((userData: any) => {
  //       this.username = userData.name;
  //       console.log("loginfetch:" + userData.name);
  //       return this.username;
  //     }),
  //     catchError((error) => {
  //       console.error('Error fetching user data:', error);
  //       // You can handle the error here, e.g., return a default value or re-throw the error.
  //       return throwError('Error fetching user data');
  //     })
  //   );
  // }
