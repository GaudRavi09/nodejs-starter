import app from "./app";
import dotenv from "dotenv";
import logger from "./services/logger";

// load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info("Logger service initialized successfully");
});
