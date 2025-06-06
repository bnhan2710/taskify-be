import { Request, Response, NextFunction } from 'express';
import { OK, CREATED } from '../../core/handler/success.reponse';
import uploadService from './upload.service';
import { AttachmentDTO } from './dto/attachment.dto';
class UploadtController {
  public async uploadAttachment(req: Request, res: Response, _next: NextFunction) {
    const file = req.file;
    const cardId = req.body.cardId;
    const result = await uploadService.uploadAttachment(file, cardId);
    new CREATED({
      message: 'Upload successfully',
      data: result,
    }).send(res);
  }

  public async uploadAvatar(req: Request, res: Response, _next: NextFunction) {
    const file = req.file;
    const userId = req.userJwt.id;
    const result = await uploadService.uploadAvatar(file, userId);
    new CREATED({
      message: 'Upload successfully',
      data: result,
    }).send(res);
  }

  public async uploadCardCover(req: Request, res: Response, _next: NextFunction) {
    const file = req.file;
    const cardId = req.params.cardId;
    const result = await uploadService.uploadCardcover(file, cardId);
    new CREATED({
      message: 'Upload successfully',
      data: result,
    }).send(res);
  }

  public async uploadBoardCover(req: Request, res: Response, _next: NextFunction) {
    const file = req.file;
    const { boardId } = req.params;
    console.log(boardId);
    const result = await uploadService.uploadBoardCover(file, boardId);
    new CREATED({
      message: 'Upload successfully',
      data: result,
    }).send(res);
  }

  public async removeBoardCover(req: Request, res: Response, _next: NextFunction) {
    const { boardId } = req.params;
    await uploadService.removeBoardCover(boardId);
    new OK({
      message: 'Delete successfully',
    }).send(res);
  }

  public async linkAttachment(req: Request, res: Response, _next: NextFunction) {
    const attachDto = AttachmentDTO(req.body);
    await uploadService.linkAttachment(attachDto);
    new CREATED({
      message: 'add Link successfully',
    }).send(res);
  }

  public async removeAttachment(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await uploadService.removeAttachment(id);
    new OK({
      message: 'Delete successfully',
    }).send(res);
  }

  public async removeCardCover(req: Request, res: Response, _next: NextFunction) {
    const { cardId } = req.params;
    await uploadService.removeCardCover(cardId);
    new OK({
      message: 'Delete successfully',
    }).send(res);
  }
}
export default new UploadtController();
