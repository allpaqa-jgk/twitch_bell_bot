const path = require("path");
const player = require("node-wav-player");
// const config = require("config");
const logger = require("./logger");
const soundList = ["bell", "pin", "po", "popi", "poyo", "pppp"];

// play sound
const playSound = (name) => {
  logger.log("============= playSound");
  const sound = path.join(__dirname, `../sounds/${name}.mp3`);
  logger.log("sound", sound);

  return new Promise((resolve, reject) => {
    player
      .play({
        path: sound,
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

// play sound
module.exports.play = (name) => {
  if (soundList.includes(name)) {
    playSound(name);
  } else {
    logger.warn("Error invalid sound name");
  }
};

module.exports.bell = () => playSound("bell");
module.exports.pin = () => playSound("pin");
module.exports.po = () => playSound("po");
module.exports.popi = () => playSound("popi");
module.exports.poyo = () => playSound("poyo");
module.exports.pppp = () => playSound("pppp");
