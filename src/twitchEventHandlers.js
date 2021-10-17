const fs = require("fs");
const path = require("path");
const config = require("config");
const tmi = require("tmi.js");
const logger = require("./logger");
const csvSync = require("csv-parse/lib/sync");
const sound = require("./sound");
const TmiActions = require("./tmiActions");

const lastChatHistory = require("./lastChatHistory");
const threshold = config.firstCommentBellDulation;

const shoutOutListFile = path.join(__dirname, "../data/shoutOutList.csv");
let shoutOutList = [];

let client;
let tmiActions;

module.exports.init = (opts) => {
  // eslint-disable-next-line new-cap
  client = new tmi.client(opts);
  tmiActions = new TmiActions(client, config.testMode);
  // tmiActions = new TmiActions(client, false);

  return client;
};

// 置換ファイル読み込み関数
const readSOList = () => {
  let res = [];
  try {
    let data = fs.readFileSync(shoutOutListFile, "utf8");
    res = csvSync(data);
  } catch (error) {
    logger.log("shoutOutListFile is not found", error, res);
  }
  // logger.log("readList", res);
  const obj = {};
  res.forEach((r) => {
    obj[r[0]] = r[1];
  });
  // logger.log("readList", obj);

  return obj;
};

module.exports.readSOList = readSOList;
shoutOutList = readSOList();

// onJoinHandler(channel: string, username: string, self: boolean)
module.exports.onJoinHandler = (channel, username, self) => {
  if (self) return;

  logger.logDev(
    "onJoin(",
    new Date().toISOString(),
    "username: ",
    username,
    ")"
  );
};

// onConnectedHandler(address: string, port: number)// Called every time the bot connects to Twitch chat
module.exports.onConnectedHandler = (address, port) => {
  logger.log(`* Connected to ${address}:${port}`);
  // tmiActions.say(channel, `* Connected`);
};

// onConnectingHandler(address: string, port: number)
module.exports.onConnectingHandler = (address, port) => {
  logger.logDev(`* Connecting to ${address}:${port}`);
};

// onDisconnectedHandler(reason: string)
module.exports.onDisconnectedHandler = (reason) => {
  logger.log(`* Disconnected to ${reason}`);
};

// onReconnectHandler()
module.exports.onReconnectHandler = () => {
  logger.logDev("onReconnect()");
};

// onRoomstateHandler(channel: string, state: RoomState)
module.exports.onRoomstateHandler = (channel, state) => {
  logger.log("* onRoomstate(state: ", state, ")");
};

// onChatHandler(channel: string, userstate: ChatUserstate, message: string, self: boolean)
module.exports.onChatHandler = (channel, userstate, message, self) => {
  // Ignore messages from the bot
  if (self) return;

  if (process.env.NODE_ENV === "development") {
    logger.log(
      "onChat(",
      new Date().toISOString(),
      "channel: ",
      channel,
      "userstate: ",
      userstate,
      "message: ",
      message
    );
  } else {
    logger.log(
      "onChat(",
      new Date().toISOString(),
      "username: ",
      userstate.username,
      "message: ",
      message
    );
  }

  try {
    const diff = lastChatHistory.update(userstate.username);

    logger.logDev("firstCommentBellIsActive", config.firstCommentBellIsActive);
    logger.logDev(
      "firstCommentBellIgnoreList",
      config.firstCommentBellIgnoreList
    );
    logger.logDev(
      "firstCommentBellOnlyRegularViewer",
      config.firstCommentBellOnlyRegularViewer
    );
    logger.logDev("diff", diff);
    logger.logDev("threshold", threshold);
    logger.logDev("diff > threshold", diff > threshold);
    logger.logDev(
      "isIncluded in ignore list",
      config.firstCommentBellIgnoreList.includes(userstate.username)
    );

    if (
      config.firstCommentBellIsActive &&
      !config.firstCommentBellIgnoreList.includes(userstate.username)
    ) {
      if (
        diff > threshold ||
        (!config.firstCommentBellOnlyRegularViewer && diff === 0)
      ) {
        ringBell();
        shoutOut(channel, userstate.username);
      } else if (config.commentPongIsActive) {
        sound.play(config.commentPongSoundName);
      }
    }
  } catch (error) {
    logger.error("ERROR: lastChatHistory.update", error.message);
  }
};

const ringBell = () => {
  sound.play(config.firstCommentBellSoundName);
};

const shoutOut = (channel, username) => {
  if (
    config.firstCommentShoutOutIsActive &&
    Object.keys(shoutOutList).includes(username)
  ) {
    logger.logDev("so message", username, shoutOutList[username]);
    let message = config.firstCommentShoutOutTemplate || "{message}";
    message = message.replace("{message}", shoutOutList[username]);

    tmiActions.say(channel, message);
  }
};

// onRaidedHandler(channel: string, username: string, viewers: number)
module.exports.onRaidedHandler = (channel, username, viewers) => {
  // CAUTION: attr username was display-name. USE onRawMessageHandler
  //
  // logger.logDev("* onRaided(username: ", username, "viewers: ", viewers, ")");
  // if (!config.raidShoutOutIsActive) return;
  // const dulation = (15 + 2 * Math.sqrt(viewers)) * 1000;
  // const message = `!so ${username}`;
  // setTimeout(() => {
  //   tmiActions.say(channel, message);
  // }, dulation);
};

// onRawMessageHandler(messageCloned: { [property: string]: any }, message: { [property: string]: any })
module.exports.onRawMessageHandler = (messageCloned, message) => {
  const ignoreCommands = [
    "ROOMSTATE",
    "CAP",
    "001",
    "002",
    "003",
    "004",
    "353",
    "366",
    "372",
    "375",
    "376",
    "JOIN",
    "HOSTTARGET",
    "PING",
    "PONG",
    "GLOBALUSERSTATE",
    "USERSTATE",
    "PRIVMSG",
  ];
  if (!ignoreCommands.includes(messageCloned.command)) {
    // logger.logDev(
    //   "* onRawMessage(message: ",
    //   messageCloned,
    //   ")",
    //   "command",
    //   messageCloned.command,
    //   "msg-id",
    //   messageCloned.tags["msg-id"]
    // );
  }

  if (
    messageCloned.command === "USERNOTICE" &&
    messageCloned.tags["msg-id"] === "raid"
  ) {
    logger.logDev("* onRawMessage(msg-id=raid, message: ", messageCloned, ")");

    const username = messageCloned.tags["login"];
    const viewers = messageCloned.tags["msg-param-viewerCount"];
    const channel = messageCloned.params[0];

    logger.log("* onRaided(username: ", username, "viewers: ", viewers, ")");
    if (!config.raidShoutOutIsActive) return;

    const dulation = (15 + 2 * Math.sqrt(viewers)) * 1000;
    const message = `!so ${username}`;
    setTimeout(() => {
      tmiActions.say(channel, message);
    }, dulation);
  }
};
