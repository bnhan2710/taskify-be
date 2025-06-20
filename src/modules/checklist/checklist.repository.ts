import { Repository } from 'typeorm';
import connection from '../../core/configs/database.connect';
import { Checklist } from '../../database/entities/Checklist';
import { Card } from '../../database/entities/Card';
import { IChecklistRepository, ICreateChecklist, IUpdateChecklist } from './interface';
class ChecklistRepository implements IChecklistRepository {
  private readonly repository: Repository<Checklist>;
  constructor() {
    this.repository = connection.getRepository(Checklist);
  }

  public async newChecklist(newChecklistDto: ICreateChecklist, card: Card): Promise<void> {
    const checklist = this.repository.create({
      description: newChecklistDto.description,
      card,
    });
    await this.repository.save(checklist);
  }

  public async getChecklistById(checklistid: string): Promise<Checklist | null> {
    return await this.repository.findOne({
      where: { id: checklistid },
      relations: ['card', 'card.list', 'card.list.board'],
    });
  }

  public async getCheckListByCard(cardId: string): Promise<Checklist[]> {
    return await this.repository.find({ where: { card: { id: cardId } } });
  }

  public async updateChecklist(
    updateChecklistDto: IUpdateChecklist,
    checklistId: string,
  ): Promise<void> {
    await this.repository.update(
      { id: checklistId },
      {
        description: updateChecklistDto.description,
        isDone: updateChecklistDto.isDone,
      },
    );
  }

  public async removeChecklist(checklist: Checklist): Promise<void> {
    await this.repository.remove(checklist);
  }
}

export default new ChecklistRepository();
