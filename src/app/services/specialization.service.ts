import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private client: HttpClient) 
  {
    // public getSpecializations(): Observable<GetDoctorsBySpecializationDto[]>{
    //   return this.client.get<GetDoctorsBySpecializationDto[]>()
    // }
   }
}
