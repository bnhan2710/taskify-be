import { IChangePassword } from '../interface';

export function ChangePasswordDTO(body: any): IChangePassword {
  return {
    currentPassword: body.currentPassword,
    newPassword: body.newPassword,
  };
}
