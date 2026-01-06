import fs from "fs";

const fsPromises = fs.promises;

const log = async (logData) => {
  try {
    logData = logData;
    await fsPromises.appendFile("log.txt", logData + "\n");
  } catch (err) {
    console.error("Error writing log:", err);
  }
};

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login")) {
    let logData = ` TimeStamp: ${new Date().toISOString()} \n Method: ${
      req.method
    } \n Request: ${req.url} \n Headers: ${
      req.headers.origin
    } \n Body: ${JSON.stringify(req.body)} \n Parameters: ${JSON.stringify(
      req.params
    )} \n Query: ${JSON.stringify(req.query)} \n`;
    log(logData);
  }
  next();
};

export default loggerMiddleware;
