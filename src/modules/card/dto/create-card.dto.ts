import { ICreateCard } from '../interface';

export function NewCardDTO(body: any): ICreateCard {
  return {
    title: body.title,
    description: body.description,
    listId: body.listId,
  };
}
