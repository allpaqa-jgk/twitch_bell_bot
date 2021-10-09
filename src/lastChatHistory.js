const fs = require("fs");
// const config = require("config");
const logger = require("./logger");
// const sound = require("./sound");

const csv = require("csv");
const path = require("path");
const csvSync = require("csv-parse/lib/sync");
// const csv = require("csvtojson");
const historyFile = path.join(__dirname, "../data/lastChatHistory.csv");
let lastChatHistory = [];

// 置換ファイル読み込み関数
const readList = () => {
  let res = [];
  try {
    let data = fs.readFileSync(historyFile, "utf8");
    res = csvSync(data);
  } catch (error) {
    logger.log("historyFile is not found", res);
  }
  // logger.log("readList", res);
  const obj = {};
  res.forEach((r) => {
    obj[r[0]] = r[1];
  });
  // logger.log("readList", obj);

  return obj;
};

const writeList = (objData) => {
  // logger.log("write data:", objData);
  const data = Object.keys(objData)
    .sort()
    .map((o) => [o, objData[o]]);
  csv.stringify(data, (error, output) => {
    if (error) {
      logger.error(error);
    }
    // console.log("output", output);
    fs.writeFile(historyFile, output, (error) => {
      if (error) {
        logger.error(error.stack);
      }
    });
  });
};

module.exports.update = (username) => {
  // logger.logDev("update", username, lastChatHistory[username]);

  logger.logDev("lastChatHistory[username]");
  logger.logDev(
    new Date(lastChatHistory[username]),
    new Date(lastChatHistory[username]).getTime()
  );
  logger.logDev(new Date(), new Date().getTime());

  const newChatSentAt = new Date();
  const previousChatSentAt = lastChatHistory[username]
    ? new Date(lastChatHistory[username])
    : newChatSentAt;
  lastChatHistory[username] = newChatSentAt.toISOString();
  writeList(lastChatHistory);

  const diff = newChatSentAt.getTime() - previousChatSentAt.getTime();
  return diff;
};

lastChatHistory = readList();
