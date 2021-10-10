const config = require("config");
const logger = require("./logger");
const twitchEventHandlers = require("./twitchEventHandlers");

module.exports.isOK = () => {
  logger.log("  /////////////////////////////");
  logger.log(" //     Checking config     //");
  logger.log("/////////////////////////////");

  // load config
  const maskedConfig = JSON.parse(JSON.stringify(config));
  const keys = Object.keys(config);
  if (keys.includes("twitchOauthToken"))
    maskedConfig.twitchOauthToken = "********************";
  // logger.log(Object.keys(config));
  logger.log(maskedConfig);

  const warnings = [];
  try {
    if (!(keys.includes("twitchOauthToken") && config.twitchOauthToken)) {
      warnings.push(
        "Something wrong with twitchOauthToken. please check config file"
      );
    }
    if (
      !(keys.includes("twitchUsername") && config.twitchUsername) &&
      !(keys.includes("twitchUsernames") && config.twitchUsernames)
    ) {
      warnings.push(
        "Something wrong with twitchUsername. please check config file"
      );
    }
    if (!(keys.includes("twitchChannelName") && config.twitchChannelName)) {
      warnings.push(
        "Something wrong with twitchChannelName. please check config file"
      );
    }

    const soList = twitchEventHandlers.readSOList();
    logger.log("shout out list", soList);

    if (warnings.length > 0) {
      warnings.forEach((warn) => {
        logger.log(`WARNING: ${warn}`);
      });
      throw new Error("Config Error");
    }
  } catch (error) {
    console.error(error.message);
    logger.log("  /////////////////////////////");
    logger.log(" //   Checking config: NG   //");
    logger.log("/////////////////////////////");
    return false;
  }
  logger.log("  /////////////////////////////");
  logger.log(" //   Checking config: OK   //");
  logger.log("/////////////////////////////");

  return true;
};
