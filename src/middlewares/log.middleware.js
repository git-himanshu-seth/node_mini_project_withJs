import winston from "winston";
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
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
    let logData = ` ${req.url} ---- ${JSON.stringify(req.body)} `;
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
