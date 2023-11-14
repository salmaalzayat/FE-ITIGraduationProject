import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { GetDoctorByIDDto } from '../Types/GetDoctorByIDDto';

@Injectable({
  providedIn: 'root'
})
export class GetDoctorByIdService {

  constructor(private client : HttpClient) { }

  public getDoctorById(id : string): Observable<GetDoctorByIDDto[]>{
    return this.client.get<GetDoctorByIDDto[]>(`https://localhost:7267/api/Doctor/doctors/${id}`);
 }
}