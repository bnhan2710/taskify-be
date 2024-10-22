import { Gender } from "../../../common/enums/gender"
export interface UpdateUserDto {
    fullName?:string,
    age?:number,
    gender?:Gender,
    avatar?:string
}
export function UpdateUserDTO(body: any): UpdateUserDto {
    return {
        fullName: body.fullName,
        age: body.age,
        gender: body.gender,
        avatar: body.avatar
    }
}