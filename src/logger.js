module.exports.log = (...args) => {
  console.log(...args);
};
module.exports.warn = (...args) => {
  console.warn(...args);
};
module.exports.error = (...args) => {
  console.error(...args);
};

module.exports.logDev = (...args) => {
  if (process.env.NODE_ENV !== "development") return;
  console.log("**", ...args);
};
module.exports.warnDev = (...args) => {
  if (process.env.NODE_ENV !== "development") return;
  console.warn("**", ...args);
};
module.exports.errorDev = (...args) => {
  if (process.env.NODE_ENV !== "development") return;
  console.error("**", ...args);
};
