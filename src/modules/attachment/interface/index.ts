import { Attachment } from "../../../database/entities/Attachment";

export interface IAttachmentDto {
    cardId: string;
    attachName?: string;
    url: string;
}

export type UploadResult = {
    url: string;
    public_id: string;
}

export interface IAttachmentService {
    uploadAttachment(file: Express.Multer.File | undefined, cardId: string): Promise<UploadResult> 
    linkAttachment(attachDto: IAttachmentDto): Promise<void>;
    removeAttachment(id: string): Promise<void>;
    getAttachmentByCard(cardId: string): Promise<Attachment[]>;
}