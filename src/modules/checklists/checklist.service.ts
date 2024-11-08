import checklistRepository from './checklist.repository';
import { BadRequestError, NotFoundError } from '../../handler/error.response';
import { Checklist } from '../../orm/entities/Checklist';
import cardRepository from '../cards/card.repository';
import { INewChecklist,IUpdateChecklist } from './dto';

class ChecklistService{
    public async newChecklist(newChecklistDto: INewChecklist): Promise<void> {
        const card = await cardRepository.findById(newChecklistDto.cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await checklistRepository.newChecklist(newChecklistDto,card);

    }   

    public async getChecklistbyCard(cardId:number):Promise<Checklist[]>{
        const card = await cardRepository.findById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        return await checklistRepository.getCheckListByCard(cardId)
    }

    public async getChecklistbyId(checklistId:number):Promise<Checklist>{
        const checklist = await checklistRepository.getChecklistById(checklistId)
        if(!checklist){
            throw new NotFoundError('Checklist not found')
        }
        return checklist
    }

    public async updateChecklist(updateChecklistDto: IUpdateChecklist, checklistId:number):Promise<void>{
        const checklist = await checklistRepository.getChecklistById(checklistId)
        if(!checklist){
            throw new NotFoundError('Checklist not found')
        }
        await checklistRepository.updateChecklist(updateChecklistDto,checklistId)
    }

    public async removeChecklist(checklistId:number):Promise<void>{
        const checklist = await checklistRepository.getChecklistById(checklistId)
        if(!checklist){
            throw new NotFoundError('Checklist not found')
        }
        await checklistRepository.removeChecklist(checklist)
    }

}

export default new ChecklistService();
