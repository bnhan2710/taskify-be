import { Checklist } from "../../../database/entities/Checklist";

export interface ICreateChecklist {
    description: string;
    cardId: string;
}

export interface IUpdateChecklist {
    description?: string;
    isDone?: boolean;
}

export interface IChecklistService {
    newChecklist(newChecklistDto: ICreateChecklist): Promise<void>;
    getChecklistbyCard(cardId: string): Promise<Checklist[]>;
    getChecklistbyId(checklistId: string): Promise<Checklist>;
    updateChecklist(updateChecklistDto: IUpdateChecklist, checklistId: string): Promise<void>;
    removeChecklist(checklistId: string): Promise<void>;
}

export interface IChecklistRepository {
    newChecklist(newChecklistDto: ICreateChecklist, card: any): Promise<void>;
    getChecklistById(checklistid: string): Promise<Checklist | null>;
    getCheckListByCard(cardId: string): Promise<Checklist[]>;
    updateChecklist(updateChecklistDto: IUpdateChecklist, checklistId: string): Promise<void>;
    removeChecklist(checklist: Checklist): Promise<void>;
}