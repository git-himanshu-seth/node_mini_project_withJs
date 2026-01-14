import winston from "winston";
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}:\n${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(format.json(), timestamp(), myFormat),
  defaultMeta: { service: "request-logging" },

  transports: [
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login")) {
    const logData = `Timestamp: ${new Date().toISOString()}\n Method: ${
      req.method
    }\nURL: ${req.url}\nHeaders: ${JSON.stringify(
      req.headers
    )}\nQuery: ${JSON.stringify(req.query)}\nBody: ${JSON.stringify(
      req.body
    )}\n`;
    logger.info(logData);
  }

  res.on("finish", () => {
    if (res.statusCode >= 400) {
      const errorLogData = `Timestamp: ${new Date().toISOString()}\n Method: ${
        req.method
      }\nURL: ${req.url}\nQuery: ${JSON.stringify(
        req.query
      )}\nBody: ${JSON.stringify(req.body)}\nStatus Code: ${
        res.statusCode
      }\nStatus Message: ${res.statusMessage}\n error`;
      logger.error(errorLogData);
    }
  });

  next();
};

export default loggerMiddleware;
