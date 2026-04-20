import app from './app.js';
import env from './config/env.js';
import { connectDatabase } from './config/db.js';
import { ensureSeedData } from './scripts/ensureSeedData.js';

async function bootstrap() {
  await connectDatabase();
  await ensureSeedData();
  const server = app.listen(env.port, () => console.log(`Server running on http://localhost:${env.port}`));
  process.on('SIGINT', () => server.close(() => process.exit(0)));
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap server', error);
  process.exit(1);
});
