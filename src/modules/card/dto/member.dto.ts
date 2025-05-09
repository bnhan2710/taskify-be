import { IMember } from '../interface';

export function MemberDTO(body: any): IMember {
  return {
    userId: body.userId,
    action: body.action,
  };
}
