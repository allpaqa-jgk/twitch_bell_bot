require("./src/initAccordingToOs.js").changeCharSet();

const forever = require("forever-monitor");
const path = require("path");

// init process.env
process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

const foreverOptions = {
  //
  // Options for restarting on watched files.
  //
  watch: true, // Value indicating if we should watch files.
  watchDirectory: ["config"], // Top-level directory to watch from.
  minUptime: 2000,
  spinSleepTime: 2000,
};
if (process.env.NODE_ENV === "development") {
  console.log("  /////////////////////////////");
  console.log(" //        DEV mode!        //");
  console.log("/////////////////////////////");
  foreverOptions.watchDirectory = ["src", "config"];

  // something.js の子プロセスの初期化
  const child = new forever.Monitor(
    path.join(__dirname, "./src/twitchBot.js"),
    foreverOptions
  );
  // イベントを定義できます
  child.on("watch:restart", (info) => {
    console.error("Restaring script because " + info.file + " changed");
  });
  child.on("restart", () => {
    console.error("Forever restarting script for " + child.times + " time");
  });
  child.on("exit:code", (code) => {
    console.error("Forever detected script exited with code " + code);
  });

  // プロセススタート
  child.start();
} else {
  require(path.join(__dirname, "./src/twitchBot.js"));
}

console.log("  /////////////////////////////");
console.log(" //     Ctrl-C to exit      //");
console.log("/////////////////////////////");
