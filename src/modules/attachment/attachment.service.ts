import { Request,Response, NextFunction } from "express";
import cloudinary from '../../configs/cloudinary.config';
import { unlinkSync } from "fs";
import { BadRequestError,NotFoundError, } from "../../handler/error.response";
import { attachmentValidation } from "./validator/attachments.validate";
import { Attachment } from "../../orm/entities/Attachment";
import connection from "../../configs/database.connect";
import cardRepository from "../card/card.repository";
import { AttachmentDto } from "./dto/attachment.dto";
class AttachmentService {
    public async uploadAttachment(file: Express.Multer.File | undefined, cardId: string): Promise<{url: string, public_id: string} | undefined> {
        if (!file) {
            throw new BadRequestError('No file uploaded');
        }
        const { error } = attachmentValidation.validate({ size: file.size });
        if (error) {
            throw new BadRequestError(error.message);
        }
        const card = await cardRepository.findById(cardId);
        if (!card) {
            throw new NotFoundError('Card not found');
        }
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'taskify-attachments',
                resource_type: 'auto'
            });
            try {
                unlinkSync(file.path);
            } catch (err) {
                console.log('Error deleting file:', err);
            }
            await connection.getRepository(Attachment).save({
                attachName: file.originalname,
                fileType: file.mimetype,
                URL: result.secure_url,
                cloudinaryPublicId: result.public_id,
                isLink: false,
                card: card,
            });
            return {
                url: result.secure_url,
                public_id: result.public_id,
            };
        } catch (error) {
            console.log('Error uploading file:', error);
            throw new BadRequestError('Upload failed');
        }
    }

    public async linkAttachment(attachDto: AttachmentDto ): Promise<void> {
        const card = await cardRepository.findById(attachDto.cardId);
        if (!card) {
            throw new NotFoundError('Card not found');
        }

        await connection.getRepository(Attachment).save({
            attachName: attachDto.attachName,
            URL: attachDto.url,
            isLink: true,
            card: card,
        });
    }

    public async removeAttachment(id: string): Promise<void> {
        const attachment = await connection.getRepository(Attachment).findOne({ where: { id } });
        if (!attachment) {
            throw new NotFoundError('Attachment not found');
        }
        if (attachment.isLink) {
           await connection.getRepository(Attachment).delete(id);
        }else{
        try {
            if(attachment.cloudinaryPublicId)
            await cloudinary.uploader.destroy(attachment.cloudinaryPublicId);
            await connection.getRepository(Attachment).delete(id);
        } catch (error) {
            console.log('Error deleting attachment:', error);
            throw new BadRequestError('Delete failed');
        }
        }
    }

    public async getAttachmentByCard(cardId: string): Promise<Attachment[]> {
        const card = await cardRepository.findById(cardId);
        if (!card) {
            throw new NotFoundError('Card not found');
        }
        return connection.getRepository(Attachment).find({ where: { card } });
    }
}
    

export default new AttachmentService();