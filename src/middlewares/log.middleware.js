import winston from "winston";
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(format.json(), timestamp(), myFormat),
  defaultMeta: { service: "request-logging" },

  transports: [new winston.transports.File({ filename: "logs/combined.log" })],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login")) {
    let logData = ` ${req.url} ---- ${JSON.stringify(req.body)} `;
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
