import { IInviteMember } from '../interface';

export function InviteMemberDTO(body: any): IInviteMember {
  return {
    email: body.email,
    roleName: body.roleName,
  };
}
