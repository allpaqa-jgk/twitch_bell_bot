const tmi = require("tmi.js");

let client;

module.exports.init = (opts) => {
  // eslint-disable-next-line new-cap
  client = new tmi.client(opts);
  return client;
};

// onActionHandler(channel: string, userstate: ChatUserstate, message: string, self: boolean)
module.exports.onActionHandler = (channel, userstate, message, self) => {
  console.log(
    "* onAction(userstate: ",
    userstate,
    "message: ",
    message,
    "self: ",
    self,
    ")"
  );
};

// onAnongiftpaidupgradeHandler(channel: string, username: string, userstate: AnonSubGiftUpgradeUserstate)
module.exports.onAnongiftpaidupgradeHandler = (
  channel,
  username,
  userstate
) => {
  console.log(
    "* onAnongiftpaidupgrade(username: ",
    username,
    "userstate: ",
    userstate,
    ")"
  );
};

// onAutomodHandler(channel: string, msgID: 'msg_rejected' | 'msg_rejected_mandatory', message: string)
module.exports.onAutomodHandler = (channel, msgID, message) => {
  console.log("* onAutomod(msgID: ", msgID, "message: ", message, ")");
};

// onBanHandler(channel: string, username: string, reason: string)
module.exports.onBanHandler = (channel, username, reason) => {
  console.log("* onBan(username: ", username, "reason: ", reason, ")");
};

// onChatHandler(channel: string, userstate: ChatUserstate, message: string, self: boolean)
module.exports.onChatHandler = (channel, userstate, message, self) => {
  // Ignore messages from the bot
  if (self) return;

  console.logDev("onChat(", new Date().toISOString(), "userstate: ", userstate);
  if (process.env.NODE_ENV !== "development") {
    console.log(
      "onMessage(",
      new Date().toISOString(),
      "username: ",
      userstate.username,
      "message: ",
      message
    );
  }
};

// onCheerHandler(channel: string, userstate: ChatUserstate, message: string)
module.exports.onCheerHandler = (channel, userstate, message) => {
  console.log("* onCheer(userstate: ", userstate, "message: ", message, ")");
};

// onClearchatHandler(channel: string)
module.exports.onClearchatHandler = (channel) => {
  console.log("* onClearchat");
};

// onConnectedHandler(address: string, port: number)// Called every time the bot connects to Twitch chat
module.exports.onConnectedHandler = (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
  // tmiActions.say(channel, `* Connected`);
};

// onConnectingHandler(address: string, port: number)
module.exports.onConnectingHandler = (address, port) => {
  console.logDev(`* Connecting to ${address}:${port}`);
};

// onDisconnectedHandler(reason: string)
module.exports.onDisconnectedHandler = (reason) => {
  console.log(`* Disconnected to ${reason}`);
};

// onEmoteonlyHandler(channel: string, enabled: boolean)
module.exports.onEmoteonlyHandler = (channel, enabled) => {
  console.log("* onEmoteonly(enabled: ", enabled, ")");
};

// onEmotesetsHandler(sets: string, obj: EmoteObj)
module.exports.onEmotesetsHandler = (sets, obj) => {
  console.log("* onEmotesets(sets: ", sets, ",\nobj: ", obj, ")");
};

// onFollowersonlyHandler(channel: string, enabled: boolean, length: number)
module.exports.onFollowersonlyHandler = (channel, enabled, length) => {
  console.log("* onFollowersonly(enabled: ", enabled, "length: ", length, ")");
};

// onGiftpaidupgradeHandler(channel: string, username: string, sender: string, userstate: SubGiftUpgradeUserstate)
module.exports.onGiftpaidupgradeHandler = (
  channel,
  username,
  sender,
  userstate
) => {
  console.log(
    "* onGiftpaidupgrade(username: ",
    username,
    "sender: ",
    sender,
    "userstate: ",
    userstate,
    ")"
  );
};

// onHostedHandler(channel: string, username: string, viewers: number, autohost: boolean)
module.exports.onHostedHandler = (channel, username, viewers, autohost) => {
  console.log(
    "* onHosted(username: ",
    username,
    "viewers: ",
    viewers,
    "autohost: ",
    autohost,
    ")"
  );
};

// onHostingHandler(channel: string, target: string, viewers: number)
module.exports.onHostingHandler = (channel, target, viewers) => {
  console.log("* onHosting(target: ", target, "viewers: ", viewers, ")");
};

// onJoinHandler(channel: string, username: string, self: boolean)
module.exports.onJoinHandler = (channel, username, self) => {
  if (self) return;

  console.log("onJoin(", new Date().toISOString(), "username: ", username, ")");
};

// onLogonHandler()
module.exports.onLogonHandler = () => {
  console.logDev("* onLogon()");
};

// onMessageHandler(channel: string, userstate: ChatUserstate, message: string, self: boolean)// Called every time a message comes in
module.exports.onMessageHandler = (channel, userstate, message, self) => {
  // Ignore messages from the bot
  if (self) return;

  console.logDev(
    "onMessage(",
    new Date().toISOString(),
    "userstate: ",
    userstate
  );
  if (process.env.NODE_ENV !== "development") {
    console.log(
      "onMessage(",
      new Date().toISOString(),
      "username: ",
      userstate.username,
      "message: ",
      message
    );
  }
};

// onMessagedeletedHandler(channel: string, username: string, deletedMessage: string, userstate: DeleteUserstate)
module.exports.onMessagedeletedHandler = (
  channel,
  username,
  deletedMessage,
  userstate
) => {
  console.log(
    "* onMessagedeleted(username: ",
    username,
    "deletedMessage: ",
    deletedMessage,
    "userstate: ",
    userstate,
    ")"
  );
};

// onModHandler(channel: string, username: string)
module.exports.onModHandler = (channel, username) => {
  console.log("* onMod(username: ", username, ")");
};

// onModsHandler(channel: string, mods: string[])
module.exports.onModsHandler = (channel, mods) => {
  console.log("* onMods(,mods: ", mods, ")");
};

// // onNoticeHandler(channel: string, msgid: MsgID, message: string)
module.exports.onNoticeHandler = (channel, msgid, message) => {
  console.log("* onNotice(msgid: ", msgid, "message: ", message, ")");
};

// onPartHandler(channel: string, username: string, self: boolean)
module.exports.onPartHandler = (channel, username, self) => {
  console.log("* onPart(username: ", username, "self: ", self, ")");
};

// onPingHandler()
module.exports.onPingHandler = () => {
  console.logDev("** onPing()");
};

// onPongHandler(latency: number)
module.exports.onPongHandler = (latency) => {
  console.logDev("** onPong(latency: ", latency, ")");
};

// onPrimepaidupgradeHandler(channel: string, username: string, methods: SubMethods, userstate: PrimeUpgradeUserstate)
module.exports.onPrimepaidupgradeHandler = (
  channel,
  username,
  methods,
  userstate
) => {
  console.log(
    "* onPrimepaidupgrade(username: ",
    username,
    "methods: ",
    methods,
    "userstate: ",
    userstate,
    ")"
  );
};

// onR9kbetaHandler(channel: string, enabled: boolean)
module.exports.onR9kbetaHandler = (channel, enabled) => {
  console.log("* onR9kbeta(enabled: ", enabled, ")");
};

// onRaidedHandler(channel: string, username: string, viewers: number)
module.exports.onRaidedHandler = (channel, username, viewers) => {
  console.log("* onRaided(username: ", username, "viewers: ", viewers, ")");
};

// onRawMessageHandler(messageCloned: { [property: string]: any }, message: { [property: string]: any })
module.exports.onRawMessageHandler = (messageCloned, message) => {
  console.log(
    "* onRawMessage(messageCloned: ",
    messageCloned,
    "message: ",
    message,
    ")"
  );
};

// onReconnectHandler()
module.exports.onReconnectHandler = () => {
  console.logDev("onReconnect()");
};

// onRedeemHandler(channel: string, username: string, rewardType: 'highlighted-message' | 'skip-subs-mode-message' | string, tags: ChatUserstate)
module.exports.onRedeemHandler = (channel, username, rewardType, tags) => {
  console.logDev(
    "* onRedeem(username: ",
    username,
    "rewardType: ",
    rewardType,
    "tags: ",
    tags,
    ")"
  );
};

// onResubHandler(channel: string, username: string, months: number, message: string, userstate: SubUserstate, methods: SubMethods)
module.exports.onResubHandler = (
  channel,
  username,
  months,
  message,
  userstate,
  methods
) => {
  console.log(
    "* onResub(username: ",
    username,
    "months: ",
    months,
    "message: ",
    message,
    "userstate: ",
    userstate,
    "methods: ",
    methods,
    ")"
  );
};

// onRoomstateHandler(channel: string, state: RoomState)
module.exports.onRoomstateHandler = (channel, state) => {
  console.log("* onRoomstate(state: ", state, ")");
};

// onServerchangeHandler(channel: string)
module.exports.onServerchangeHandler = (channel) => {
  console.logDev("onServerchange");
};

// onSlowmodeHandler(channel: string, enabled: boolean, length: number)
module.exports.onSlowmodeHandler = (channel, enabled, length) => {
  console.log("* onSlowmode(enabled: ", enabled, "length: ", length, ")");
};

// onSubgiftHandler(channel: string, username: string, streakMonths: number, recipient: string, methods: SubMethods, userstate: SubGiftUserstate)
module.exports.onSubgiftHandler = (
  channel,
  username,
  streakMonths,
  recipient,
  methods,
  userstate
) => {
  console.log(
    "* onSubgift(username: ",
    username,
    "streakMonths: ",
    streakMonths,
    "recipient: ",
    recipient,
    "methods: ",
    methods,
    "userstate: ",
    userstate,
    ")"
  );
};

// onSubmysterygiftHandler(channel: string, username: string, numbOfSubs: number, methods: SubMethods, userstate: SubMysteryGiftUserstate)
module.exports.onSubmysterygiftHandler = (
  channel,
  username,
  numbOfSubs,
  methods,
  userstate
) => {
  console.log(
    "* onSubmysterygift(username: ",
    username,
    "numbOfSubs: ",
    numbOfSubs,
    "methods: ",
    methods,
    "userstate: ",
    userstate,
    ")"
  );
};

// onSubscribersHandler(channel: string, enabled: boolean)
module.exports.onSubscribersHandler = (channel, enabled) => {
  console.log("* onSubscribers(enabled: ", enabled, ")");
};

// onSubscriptionHandler(channel: string, username: string, methods: SubMethods, message: string, userstate: SubUserstate)
module.exports.onSubscriptionHandler = (
  channel,
  username,
  methods,
  message,
  userstate
) => {
  console.log(
    "* onSubscription(username: ",
    username,
    "methods: ",
    methods,
    "message: ",
    message,
    "userstate: ",
    userstate,
    ")"
  );
};

// onTimeoutHandler(channel: string, username: string, reason: string, duration: number)
module.exports.onTimeoutHandler = (channel, username, reason, duration) => {
  console.log(
    "* onTimeout(username: ",
    username,
    "reason: ",
    reason,
    "duration: ",
    duration,
    ")"
  );
};

// onUnhostHandler(channel: string, viewers: number)
module.exports.onUnhostHandler = (channel, viewers) => {
  console.log("* onUnhost(viewers: ", viewers, ")");
};

// onUnmodHandler(channel: string, username: string)
module.exports.onUnmodHandler = (channel, username) => {
  console.log("* onUnmod(username: ", username, ")");
};

// onVipsHandler(channel: string, vips: string[])
module.exports.onVipsHandler = (channel, vips) => {
  console.log("* onVips(vips: ", vips, ")");
};

// onWhisperHandler(from: string, userstate: ChatUserstate, message: string, self: boolean)
module.exports.onWhisperHandler = (from, userstate, message, self) => {
  console.log(
    "* onWhisper(from: ",
    from,
    "userstate: ",
    userstate,
    "message: ",
    message,
    "self: ",
    self,
    ")"
  );
};
