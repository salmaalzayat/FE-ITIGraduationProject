import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DoctorDialogueService {
  data:any;
  constructor(private dialog : MatDialog) { }
  open(data: any){
    this.data = data;
  }
}
