import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";

export interface GetAllDoctorsDto {
    id: string;
    name: string;
    title: string | null;
    description: string | null;
    specializationName: string;
    performanceRate: number;
    weekSchadual: WeekScheduleForDoctorsDto[] | null;
}