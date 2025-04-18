import { Attachment } from '../../../database/entities/Attachment';

export interface IAttachmentDto {
  cardId: string;
  attachName?: string;
  url: string;
}

export type UploadResult = {
  url: string;
  public_id: string;
};

export interface IUploadService {
  uploadAttachment(file: Express.Multer.File | undefined, cardId: string): Promise<UploadResult>;
  uploadAvatar(file: Express.Multer.File | undefined, userId: string): Promise<{ avatar: string }>;
  linkAttachment(attachDto: IAttachmentDto): Promise<void>;
  removeAttachment(id: string): Promise<void>;
  getAttachmentByCard(cardId: string): Promise<Attachment[]>;
}
