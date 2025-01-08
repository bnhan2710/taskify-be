export interface LoginDto {
    email: string;
    password: string
}

export function LoginDTO(body: any): LoginDto {
    return {
        email: body.email,
        password: body.password
    }
}
