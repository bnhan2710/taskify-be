export interface LoginDto {
    username: string;
    password: string
}

export function LoginDTO(body: any): LoginDto {
    return {
        username: body.username,
        password: body.password
    }
}
