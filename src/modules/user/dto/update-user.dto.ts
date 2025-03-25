import { IUpdateUserDto } from "../interface";

export function UpdateUserDTO(body: any): IUpdateUserDto {
    return {
        displayName: body.displayName,
        age: body.age,
        gender: body.gender,
        avatar: body.avatar
    }
}
