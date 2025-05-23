import { config } from 'dotenv';
import path from 'path';
config({ path: path.join(process.cwd(), '.env') });
import { createHttpServer } from './app';
import env from './core/configs/env.config';
import { connectDB } from './core/configs/database.connect';
import { connectRedis } from './core/configs/redis.config';

async function start() {
  await connectDB();
  await connectRedis();
  const server = createHttpServer();

  server.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });

  process.on('SIGINT', () => {
    server.close();
    process.exit(0);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
