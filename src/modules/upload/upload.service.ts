import { Request, Response, NextFunction } from 'express';
import cloudinary from '../../core/configs/cloudinary.config';
import { unlinkSync } from 'fs';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { attachmentValidation } from './validator/attachments.validate';
import { Attachment } from '../../database/entities/Attachment';
import connection from '../../core/configs/database.connect';
import cardRepository from '../card/card.repository';
import { IAttachmentDto, IUploadService } from './interface';
import { UploadResult } from './interface';
import { User } from '../../database/entities/User';
import { Card } from '../../database/entities/Card';
import { Board } from '../../database/entities/Board';
class UploadService implements IUploadService {
  public async uploadAttachment(
    file: Express.Multer.File | undefined,
    cardId: string,
  ): Promise<UploadResult> {
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
        resource_type: 'auto',
      });
      try {
        unlinkSync(file.path);
      } catch (err) {
        console.log('Error deleting file:', err);
      }
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.log('Error uploading file:', error);
      throw new BadRequestError('Upload failed');
    }
  }

  public async uploadAvatar(
    file: Express.Multer.File | undefined,
    userId: string,
  ): Promise<{ avatar: string }> {
    if (!file) {
      throw new BadRequestError('No file uploaded');
    }
    const { error } = attachmentValidation.validate({ size: file.size });
    if (error) {
      throw new BadRequestError(error.message);
    }
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'taskify-avatars',
        resource_type: 'auto',
      });
      try {
        unlinkSync(file.path);
      } catch (err) {
        console.log('Error deleting file:', err);
      }
      const user = await connection.getRepository(User).findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundError('User not found');
      }

      //delete old avatar with url
      if (user.avatar) {
        const oldAvatar = user.avatar.split('/').pop();
        await cloudinary.uploader.destroy(`taskify-avatars/${oldAvatar}`);
      }
      await connection.getRepository(User).update(userId, {
        avatar: result.secure_url,
      });

      return { avatar: result.secure_url };
    } catch (error) {
      console.log('Error uploading file:', error);
      throw new BadRequestError('Upload failed');
    }
  }

  public async uploadCardcover(file: Express.Multer.File | undefined, cardId: string) {
    if (!file) {
      throw new BadRequestError('No file uploaded');
    }
    const { error } = attachmentValidation.validate({ size: file.size });
    if (error) {
      throw new BadRequestError(error.message);
    }
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'taskify-cardcovers',
        resource_type: 'auto',
      });
      try {
        unlinkSync(file.path);
      } catch (err) {
        console.log('Error deleting file:', err);
      }
      const card = await cardRepository.findById(cardId);
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      //delete old cover with url
      if (card.cover) {
        const oldCover = card.cover.split('/').pop();
        await cloudinary.uploader.destroy(`taskify-cardcovers/${oldCover}`);
      }
      await connection.getRepository(Card).update(cardId, {
        cover: result.secure_url,
      });
      return { url: result.secure_url };
    } catch (error) {
      console.log('Error uploading file:', error);
      throw new BadRequestError('Upload failed');
    }
  }

  public async removeCardCover(cardId: string): Promise<void> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    if (card.cover) {
      const cover = card.cover.split('/').pop();
      await cloudinary.uploader.destroy(`taskify-cardcovers/${cover}`);
      await connection.getRepository(Card).update(cardId, {
        cover: null,
      });
    }
  }

  public async uploadBoardCover(file: Express.Multer.File | undefined, boardId: string) {
    if (!file) {
      throw new BadRequestError('No file uploaded');
    }
    const { error } = attachmentValidation.validate({ size: file.size });
    if (error) {
      throw new BadRequestError(error.message);
    }
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'taskify-board-covers',
        resource_type: 'auto',
      });
      try {
        unlinkSync(file.path);
      } catch (err) {
        console.log('Error deleting file:', err);
      }
      const board = await connection.getRepository(Board).findOne({ where: { id: boardId } });
      if (!board) {
        throw new NotFoundError('Board not found');
      }
      if (board.cover) {
        const oldCover = board.cover.split('/').pop();
        await cloudinary.uploader.destroy(`taskify-board-covers/${oldCover}`);
      }
      await connection.getRepository(Board).update(boardId, {
        cover: result.secure_url,
      });
      return { url: result.secure_url };
    } catch (error) {
      console.log('Error uploading file:', error);
      throw new BadRequestError('Upload failed');
    }
  }

  public async removeBoardCover(boardId: string): Promise<void> {
    const board = await connection.getRepository(Board).findOne({ where: { id: boardId } });
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    if (board.cover) {
      const cover = board.cover.split('/').pop();
      await cloudinary.uploader.destroy(`taskify-board-covers/${cover}`);
      await connection.getRepository(Board).update(boardId, {
        cover: null,
      });
    }
  }

  public async linkAttachment(attachDto: IAttachmentDto): Promise<void> {
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
    } else {
      try {
        if (attachment.cloudinaryPublicId) {
          await cloudinary.uploader.destroy(attachment.cloudinaryPublicId);
        }
        await connection.getRepository(Attachment).delete(id);
      } catch (error) {
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

export default new UploadService();
