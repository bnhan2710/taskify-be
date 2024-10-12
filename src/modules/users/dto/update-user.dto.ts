export interface UpdateUserDto {
    fullName?:string,
    age?:number
}
export function UpdateUserDTO(body: any): UpdateUserDto {
    return {
        fullName : body.fullName,
        age: body.age
    }
}