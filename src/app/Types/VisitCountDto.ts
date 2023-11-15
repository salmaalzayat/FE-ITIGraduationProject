export interface VisitCountDto {
    id: number;
    date: string;
    limitOfPatients: number;
    actualNoOfPatients: number;
    doctorId: string | null;
}