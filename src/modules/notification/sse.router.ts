import { Router } from 'express';
const router = Router();
import { NotificationEntity } from '../../database/entities/Notification';
import connection from '../../core/configs/database.connect';
import { sendNotification, sseHandler } from './sse.handler';

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const notification = new NotificationEntity();
    notification.message = message;

    await connection.getRepository(NotificationEntity).save(notification);
    sendNotification(message);
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/sse', sseHandler);

export default router;
