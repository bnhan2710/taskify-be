import Joi from 'joi';

export const createNotificationSchema = Joi.object({
  message: Joi.string().required(),
  userId: Joi.string().required(),
  boardId: Joi.string().required(),
});
