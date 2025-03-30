import { IRegister } from "../interface";

export function RegisterDTO(body: any): IRegister {
    return {
        username: body.username,
        password: body.password,
        email: body.email,   
    }
}
