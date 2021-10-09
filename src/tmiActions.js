const logger = require("./logger");

const TmiActions = class {
  constructor(client, testMode) {
    this.testMode = testMode;
    this.client = client;
  }

  say(channel, message) {
    if (this.testMode) {
      logger.log("channel:", channel, "message:", message);
    } else {
      this.client.say(channel, message);
    }
  }
};

module.exports = TmiActions;
