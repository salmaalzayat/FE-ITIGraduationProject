export interface WeekScheduleForDoctorsDto {
    dayOfWeek: string | null;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}