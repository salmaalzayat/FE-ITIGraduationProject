import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBetweenDoctorCompHeroCompService {

  private specializationId =  new BehaviorSubject<number>(0);
  currentId = this.specializationId.asObservable();
  constructor() { }

  changeSpecializationId(sId : number){
    this.specializationId.next(sId)
  }
}
