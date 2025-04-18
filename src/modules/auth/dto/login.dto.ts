import { ICredentials } from '../interface';

export function LoginDTO(body: any): ICredentials {
  return {
    email: body.email,
    password: body.password,
  };
}
