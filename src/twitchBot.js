const config = require("config");
const sound = require("./sound");
const twitchEventHandlers = require("./twitchEventHandlers");
const logger = require("./logger");
const checkConfig = require("./checkConfig");

let client;

// Define configuration options
let opts;

logger.log("=========== TwitchBot.js ===========");
if (checkConfig.isOK()) {
  opts = {
    identity: {
      password: config.twitchOauthToken,
      username: config.twitchUsername,
    },
    channels: config.twitchChannelNames
      ? config.twitchChannelNames
      : [config.twitchChannelName],
  };
  // logger.logDev(opts);

  // Create a client with our options
  client = twitchEventHandlers.init(opts);

  // Connection
  client.on("connected", twitchEventHandlers.onConnectedHandler);
  client.on("connecting", twitchEventHandlers.onConnectingHandler);
  client.on("disconnected", twitchEventHandlers.onDisconnectedHandler);
  client.on("reconnect", twitchEventHandlers.onReconnectHandler);
  client.on("join", twitchEventHandlers.onJoinHandler);
  // client.on("logon", twitchEventHandlers.onLogonHandler);
  // client.on("ping", twitchEventHandlers.onPingHandler);
  // client.on("pong", twitchEventHandlers.onPongHandler);

  // Channel info
  client.on("roomstate", twitchEventHandlers.onRoomstateHandler);
  // client.on("serverchange", twitchEventHandlers.onServerchangeHandler)

  // Chat config
  // client.on("clearchat", twitchEventHandlers.onClearchatHandler);
  // client.on("emoteonly", twitchEventHandlers.onEmoteonlyHandler);
  // client.on("emotesets", twitchEventHandlers.onEmotesetsHandler);
  // client.on("followersonly", twitchEventHandlers.onFollowersonlyHandler);
  // client.on("slowmode", twitchEventHandlers.onSlowmodeHandler);

  // Role
  // client.on("mod", twitchEventHandlers.onModHandler);
  // client.on("mods", twitchEventHandlers.onModsHandler);
  // client.on("unmod", twitchEventHandlers.onUnmodHandler);
  // client.on("vips", twitchEventHandlers.onVipsHandler);

  // Host/Raid
  // client.on("hosted", twitchEventHandlers.onHostedHandler);
  client.on("raided", twitchEventHandlers.onRaidedHandler);
  // client.on("hosting", twitchEventHandlers.onHostingHandler);
  // client.on("unhost", twitchEventHandlers.onUnhostHandler);

  // Ban/Timeout/Delete
  // client.on("ban", twitchEventHandlers.onBanHandler);
  // client.on("messagedeleted", twitchEventHandlers.onMessagedeletedHandler);
  // client.on("timeout", twitchEventHandlers.onTimeoutHandler);

  // Message
  client.on("chat", twitchEventHandlers.onChatHandler);
  // client.on("message", twitchEventHandlers.onMessageHandler);
  // client.on("raw_message", twitchEventHandlers.onRawMessageHandler);

  // Moderation
  // client.on("action", twitchEventHandlers.onActionHandler);
  // client.on("automod", twitchEventHandlers.onAutomodHandler);
  // client.on("notice", twitchEventHandlers.onNoticeHandler);
  // client.on("part", twitchEventHandlers.onPartHandler);
  // client.on("r9kbeta", twitchEventHandlers.onR9kbetaHandler);

  // Bits/Sub/Redeem
  // client.on("cheer", twitchEventHandlers.onCheerHandler);
  // client.on("anongiftpaidupgrade", twitchEventHandlers.onAnongiftpaidupgradeHandler);
  // client.on("giftpaidupgrade", twitchEventHandlers.onGiftpaidupgradeHandler);
  // client.on("primepaidupgrade", twitchEventHandlers.onPrimepaidupgradeHandler);
  // client.on("redeem", twitchEventHandlers.onRedeemHandler);
  // client.on("resub", twitchEventHandlers.onResubHandler);
  // client.on("subgift", twitchEventHandlers.onSubgiftHandler);
  // client.on("submysterygift", twitchEventHandlers.onSubmysterygiftHandler);
  // client.on("subscribers", twitchEventHandlers.onSubscribersHandler);
  // client.on("subscription", twitchEventHandlers.onSubscriptionHandler);

  // Private
  // client.on("whisper", twitchEventHandlers.onWhisperHandler);

  // Connect to Twitch:
  client.connect();

  if (config.bootSound) {
    // play pin sound
    sound.play(config.bootSoundName);
  }
}
