import { ListEntity } from '../../../database/entities/List';
import { List } from '../interface';
import { ICreateList, IUpdateList } from '../dto';

export class ListMapper {
  public static toList(entity: ListEntity): List {
    return {
      id: entity.id,
      title: entity.title,
      boardId: entity.board?.id,
      cardOrderIds: entity.cardOrderIds || [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toCreateListDTO(body: any): ICreateList {
    return {
      title: body.title?.trim() ?? '',
      boardId: body.boardId,
    };
  }
  public static toUpdateListDTO(body: any): IUpdateList {
    return {
      title: body.title?.trim(),
      cardOrderIds: body.cardOrderIds,
    };
  }
}
