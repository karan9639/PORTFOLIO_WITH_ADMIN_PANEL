import { connectDatabase } from '../config/db.js';
import { ensureSeedData } from './ensureSeedData.js';

connectDatabase()
  .then(ensureSeedData)
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  });
