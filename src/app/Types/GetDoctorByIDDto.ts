import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";

export interface GetDoctorByIDDto {
    iD: string;
    name: string;
    title: string | null;
    description: string | null;
    specializationName: string;
    weekSchadual: WeekScheduleForDoctorsDto[] | null;
}