import { Request,Response, NextFunction } from "express";
import cloudinary from '../../configs/cloudinary.config';
import { unlinkSync } from "fs";
import { BadRequestError,NotFoundError, } from "../../handler/error.response";
import { attachmentValidation } from "./validator/attachments.validate";
import { Attachment } from "../../orm/entities/Attachment";
import connection from "../../configs/database.connect";
import cardRepository from "../cards/card.repository";
import fs from 'fs'

class AttachmentService {
    public async uploadAttachment(file: Express.Multer.File | undefined, cardId: number): Promise<{url: string, public_id: string} | undefined> {
        if (!file) {
            throw new BadRequestError('No file uploaded');
        }
        const { error } = attachmentValidation.validate({ size: file.size });
        if (error) {
            throw new BadRequestError(error.message);
        }
        const card = await cardRepository.getCardById(cardId);
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
                fileName: file.originalname,
                fileType: file.mimetype,
                cloudinaryUrl: result.secure_url,
                cloudinaryPublicId: result.public_id,
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
}
    

export default new AttachmentService();