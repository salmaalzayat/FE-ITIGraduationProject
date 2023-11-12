import { ChildDoctorOfSpecializationDto } from "./ChildDoctorOfSpecializationDto";

export interface GetDoctorsBySpecializationDto {
    name: string | null;
    childDoctorOfSpecializations: ChildDoctorOfSpecializationDto[] | null;
}