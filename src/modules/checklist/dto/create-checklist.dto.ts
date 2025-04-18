import { ICreateChecklist } from '../interface';

export function CreateChecklistDTO(body: any): ICreateChecklist {
  return {
    description: body.description,
    cardId: body.cardId,
  };
}
