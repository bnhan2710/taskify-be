import Joi from 'joi';
import { BoardInvitationStatus } from '../../../shared/common/enums/board-invitation-status';

export const updateNotificationSchema = Joi.object({
  status: Joi.string()
    .valid(
      BoardInvitationStatus.ACCEPTED,
      BoardInvitationStatus.REJECTED,
      BoardInvitationStatus.PENDING,
    )
    .required(),
});
