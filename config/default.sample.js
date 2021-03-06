// /////////////////////////
//          MODE          //
// /////////////////////////
module.exports.testMode = false;
module.exports.bootSound = false;
module.exports.bootSoundName = "pin";

// /////////////////////////
//         TWITCH         //
// /////////////////////////
// The token to authenticate your chatbot with Twitch's servers.
// Generate this with https://twitchapps.com/tmi/
// The token will be an alphanumeric string.
// like "oauth:0123456789abcdefghijklmnopqrst"
module.exports.twitchOauthToken = "oauth:";
module.exports.twitchUsername = "";

// The Twitch channel name where you want to run the bot. Usually this is your main Twitch account.
module.exports.twitchChannelName = "";

// commentPong
module.exports.commentPongIsActive = true;
module.exports.commentPongSoundName = "po";

// firstCommentBell
module.exports.firstCommentBellIsActive = true;
module.exports.firstCommentBellSoundName = "bell";
module.exports.firstCommentBellOnlyRegularViewer = true;
module.exports.firstCommentBellDulation = 12 * 60 * 60 * 1000;
module.exports.firstCommentBellIgnoreList = [
  // "your_username",
  // "username_of_your_bot",
  "streamlabs",
  "nightbot",
  "songlistbot",
  "streamelements",
];

// firstCommentShoutOut
module.exports.firstCommentShoutOutIsActive = true;
module.exports.firstCommentShoutOutTemplate =
  "********************** {message} {url} **********************************************";

// raidShoutOut
module.exports.raidShoutOutIsActive = true;
