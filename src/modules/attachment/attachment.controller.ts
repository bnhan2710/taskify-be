import cloudinary from '../../configs/cloudinary.config';
import { upload } from '../../utils/multer.uitl';
import { Request, Response, NextFunction } from 'express'
import {OK, CREATED} from '../../handler/success.reponse';
import AttachmentService from './attachment.service';
import fs from 'fs'

class AttachmentController{
  
  public async uploadAttachment(req: Request, res: Response, next: NextFunction){
    const file = req.file;
    const cardId = req.body.cardId;
    const result = await AttachmentService.uploadAttachment(file, cardId);
    new CREATED({
      message: 'Upload successfully',
      data: result
    }).send(res)
  }

  public async removeAttachment(req: Request, res: Response, next: NextFunction){
    const {id} = req.params
    await AttachmentService.removeAttachment(parseInt(id))
    new OK({
      message: 'Delete successfully'
    }).send(res)
  }
}

export default new AttachmentController();
