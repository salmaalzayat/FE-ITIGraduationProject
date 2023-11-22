import { Component, OnInit } from '@angular/core'; 
import { AuthenticationService } from '../services/authService.service';
 import { GetMedicalHistoryByPhoneDto } from '../Types/GetMedicalHistoryByPhoneDto';
import { patiantMedicalHistory } from '../services/patientMedicalHistory.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})

export class MedicalHistoryComponent implements OnInit {
  phoneNumber: string = '';
  userData: any;
  MedicalHistoryDto?: GetMedicalHistoryByPhoneDto;
  errorLoadingData: boolean = false;

  constructor(
    private patientMedicalHistory: patiantMedicalHistory
  ) {}

  ngOnInit(): void {
    this.getMedicalHistory();
  }

  getMedicalHistory() {
    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.phoneNumber = this.userData.phoneNumber;
      console.log(this.phoneNumber);
      this.patientMedicalHistory.getMedicalHistory(this.phoneNumber).subscribe({
        next: (medicalHistory) => {
          this.MedicalHistoryDto = medicalHistory;
          console.log(this.MedicalHistoryDto);
        },
        error: (error) => {
          console.error('Calling API failed', error);
          this.errorLoadingData = true;
        },
      });
    }
  }
}