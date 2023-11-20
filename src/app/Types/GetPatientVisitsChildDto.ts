export interface GetPatientVisitsChildDto {
  doctorId: string;
  dateOfVisit: string;
  comments: string | null;
  symptoms: string | null;
  visitStatus: string | null;
  arrivalTime: string;
  visitStartTime: string;
  visitEndTime: string;
  prescription: string | null;
}
