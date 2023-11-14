// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'https://your-api-base-url'; // Replace with your actual API base URL

//   constructor(private http: HttpClient) { }

//   register(registerData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, registerData);
//   }
// }
/////////////////////////////////////////////////

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class RegistrationService {
//   private apiUrl = 'https://localhost:7267/api/Patient'; // Replace with your API URL

//   constructor(private http: HttpClient) {}

//   register(RegisterPatientDto: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });

//     return this.http.post<any>(`${this.apiUrl}/register`, RegisterPatientDto, {
//       headers: headers,
//     });
//   }
// }

////////////////////////////////////

// It looks like you're trying to register a new patient and receive a token in the response. Since you want to receive a token, you need to update your Angular service to handle the response appropriately. Here's how you can modify your service and component:

// Update the RegistrationService in your Angular application to handle the response and return an AuthResponseDto. Also, adjust the register method to return Observable<AuthResponseDto>:
// typescript
// Copy code
// registration.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable , BehaviorSubject , tap} from 'rxjs';
// import  TokenDto  from '../Types/TokenDto'; // Adjust the import path
// import RegisterPatientDto from '../Types/PatientRegisterDto';

// @Injectable({
//   providedIn: 'root',
// })
// export class RegistrationService {
//   // private apiUrl = 'https://localhost:7267/api/Patient'; // Update the base URL

//   constructor(private http: HttpClient) {}

//   public getData():Observable<string[]>{
//     return this.http.get<string[]>{
//       `https://localhost:7267/api/Patient/register`
//     }
//   };

  // register(registerDto: any): Observable<TokenDto> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

    // return this.http.post<TokenDto>(`https://localhost:7267/api/Patient/register`, registerDto, {
    //   headers: headers,
    // });
  // }
// }

import { Injectable } from '@angular/core';
import  patientRegisterDto  from '../Types/PatientRegisterDto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import  TokenDto  from '../Types/TokenDto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {}

  public login(credentials: patientRegisterDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('https://localhost:7267/api/Patient/register', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);
        })
      );
  }
}
