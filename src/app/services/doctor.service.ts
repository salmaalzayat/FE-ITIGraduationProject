import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private client: HttpClient) { }
  public getDoctors(): Observable<GetAllDoctorsDto[]>{
    return this.client.get<GetAllDoctorsDto[]>('https://localhost:7267/api/Doctor');
  }
}
