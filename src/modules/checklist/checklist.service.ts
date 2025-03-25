import checklistRepository from './checklist.repository';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { Checklist } from '../../database/entities/Checklist';
import cardRepository from '../card/card.repository';
import { ICreateChecklist, IUpdateChecklist } from './interface';

class ChecklistService {
    public async newChecklist(newChecklistDto: ICreateChecklist): Promise<void> {
        const card = await cardRepository.findById(newChecklistDto.cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await checklistRepository.newChecklist(newChecklistDto,card);
    }   

    public async getChecklistbyCard(cardId:string):Promise<Checklist[]>{
        const card = await cardRepository.findById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        return await checklistRepository.getCheckListByCard(cardId)
    }

    public async getChecklistbyId(checklistId:string):Promise<Checklist>{
        const checklist = await checklistRepository.getChecklistById(checklistId)
        if(!checklist){
            throw new NotFoundError('Checklist not found')
        }
        return checklist
    }

    public async updateChecklist(updateChecklistDto: IUpdateChecklist, checklistId:string):Promise<void>{
        const checklist = await checklistRepository.getChecklistById(checklistId)
        if(!checklist){
            throw new NotFoundError('Checklist not found')
        }
        await checklistRepository.updateChecklist(updateChecklistDto,checklistId)
    }

    public async removeChecklist(checklistId:string):Promise<void>{
        const checklist = await checklistRepository.getChecklistById(checklistId)
        if(!checklist){
            throw new NotFoundError('Checklist not found')
        }
        await checklistRepository.removeChecklist(checklist)
    }

}

export default new ChecklistService();
