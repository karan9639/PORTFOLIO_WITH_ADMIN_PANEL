import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import { ensureSeedData } from "./scripts/ensureSeedData.js";

async function bootstrap() {
  console.log("Booting server...");
  console.log(`NODE_ENV=${env.nodeEnv}`);
  console.log(`PORT=${env.port}`);
  console.log(`Mongo URI present: ${Boolean(env.mongoUri)}`);

  await connectDatabase();
  console.log("Database step completed");

  await ensureSeedData();
  console.log("Seed check completed");

  const server = app.listen(env.port, "0.0.0.0", () => {
    console.log(`Server running on port ${env.port}`);
  });

  process.on("SIGINT", () => server.close(() => process.exit(0)));
  process.on("SIGTERM", () => server.close(() => process.exit(0)));
}

bootstrap().catch((error) => {
  console.error("Failed to bootstrap server");
  console.error(error);
  process.exit(1);
});
