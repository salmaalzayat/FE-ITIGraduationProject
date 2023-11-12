import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";

export interface ChildDoctorOfSpecializationDto {
    name: string;
    title: string | null;
    description: string | null;
    weekSchadual: WeekScheduleForDoctorsDto[] | null;
}