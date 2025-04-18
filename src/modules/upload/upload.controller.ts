import { Request, Response, NextFunction } from 'express';
import { OK, CREATED } from '../../core/handler/success.reponse';
import uploadService from './upload.service';
import { AttachmentDTO } from './dto/attachment.dto';
class UploadtController {
  public async uploadAttachment(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    const cardId = req.body.cardId;
    const result = await uploadService.uploadAttachment(file, cardId);
    new CREATED({
      message: 'Upload successfully',
      data: result,
    }).send(res);
  }

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    const userId = req.userJwt.id;
    const result = await uploadService.uploadAvatar(file, userId);
    new CREATED({
      message: 'Upload successfully',
      data: result,
    }).send(res);
  }

  public async linkAttachment(req: Request, res: Response, next: NextFunction) {
    const attachDto = AttachmentDTO(req.body);
    await uploadService.linkAttachment(attachDto);
    new CREATED({
      message: 'add Link successfully',
    }).send(res);
  }

  public async removeAttachment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await uploadService.removeAttachment(id);
    new OK({
      message: 'Delete successfully',
    }).send(res);
  }
}
export default new UploadtController();
