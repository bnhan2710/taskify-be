import { Request, Response } from 'express';

let clients: Response[] = [];

export const sseHandler = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter((client) => client !== res);
  });
  res.write('SSE Connected\n\n');
  return;
};

export const sendNotification = (message: string) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify({ message })}\n\n`);
  });
};
