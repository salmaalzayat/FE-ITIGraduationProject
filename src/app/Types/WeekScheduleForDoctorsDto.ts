export interface WeekScheduleForDoctorsDto {
    int : number ;
    dayOfWeek: string | null;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}