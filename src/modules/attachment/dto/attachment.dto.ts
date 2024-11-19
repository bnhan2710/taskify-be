export interface AttachmentDto {
    cardId: number;
    attachName?: string;
    url: string;
}

export function AttachmentDTO(body: any): AttachmentDto {
    return {
        cardId: body.cardId,
        attachName: body.attachName,
        url: body.url,
    };
}