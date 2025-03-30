import { IAttachmentDto } from "../interface";

export function AttachmentDTO(body: any): IAttachmentDto {
    return {
        cardId: body.cardId,
        attachName: body.attachName,
        url: body.url,
    };
}