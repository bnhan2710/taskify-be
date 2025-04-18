import { IAddMember } from '../interface';

export function AddMemberDTO(body: any): IAddMember {
  return {
    userId: body.userId,
  };
}
