import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { GetDoctorsBySpecializationDto } from '../Types/GetDoctorsBySpecializationDto';
@Injectable({
  providedIn: 'root'
})
export class DoctorsBySpecializationService {
  
  constructor(private client: HttpClient) { }
  public getDoctorsBySpecialization(id : number): Observable<GetDoctorsBySpecializationDto[]>{
    return this.client.get<GetDoctorsBySpecializationDto[]>(`https://localhost:7267/api/Doctor/doctors/specialization/${id}`);


  }

}
