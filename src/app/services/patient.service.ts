import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPatientByPhoneDTO } from '../Types/GetPatientByPhoneDTO';
import { Observable } from 'rxjs';
import { AddPatientVisitDto } from '../Types/AddPatientVisitDto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private client : HttpClient) { }
  public getPatientByPhoneNumber(PhoneNumber: string): Observable<GetPatientByPhoneDTO>{
    return this.client.get<GetPatientByPhoneDTO>(`https://localhost:7267/api/Patient/patient/${PhoneNumber}`);
  }

  public addPatientVisit(patientVisit : AddPatientVisitDto): void{
    this.client.post<void>(`https://localhost:7267/addpatientVisit`, patientVisit);
  }
}
