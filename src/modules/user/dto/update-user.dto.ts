import { Gender } from "../../../common/enums/gender"
export interface UpdateUserDto {
    displayName?:string,
    age?:number,
    gender?:Gender,
    avatar?:string
}
export function UpdateUserDTO(body: any): UpdateUserDto {
    return {
        displayName: body.displayName,
        age: body.age,
        gender: body.gender,
        avatar: body.avatar
    }
}
