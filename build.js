// eslint-disable-next-line node/no-unpublished-require
const { compile } = require("nexe");
const path = require("path");
const execSync = require("child_process").execSync;

async function runBuild() {
  let options;
  options = {
    targetNode: "mac-x64-12.6.0",
    targetDir: "twitch_bell_bot_for_mac",
    name: "twitch_bell_bot",
  };

  await makeReleaseFiles(options);

  // options = {
  //   targetNode: "windows-x64-12.6.0",
  //   targetDir: "twitch_bell_bot_for_win",
  //   name: "twitch_bell_bot",
  // };
  // await makeReleaseFiles(options);
}

async function makeReleaseFiles(options) {
  const targetNode = options.targetNode;
  const targetDir = options.targetDir;
  const name = options.name;

  console.info("clean up dist");
  let command;

  command = `rm -rf ${path.join(__dirname, `./dist/${targetDir}`)}`;
  console.info(command);
  console.log(execSync(command).toString());

  const dirList = [
    { name: "./", addKeepFile: false },
    { name: "./config", addKeepFile: false },
    { name: "./data", addKeepFile: false },
    { name: "./sounds", addKeepFile: false },
  ];

  dirList.forEach((dir) => {
    command = `mkdir -p ${path.join(
      __dirname,
      `./dist/${targetDir}/${dir.name}`
    )}`;
    console.info(command);
    console.log(execSync(command).toString());

    if (dir.addKeepFile) {
      command = `touch ${path.join(
        __dirname,
        `./dist/${targetDir}/${dir.name}/.keep`
      )}`;
      console.info(command);
      console.log(execSync(command).toString());
    }
  });

  await compile({
    input: path.join(__dirname, "./main.js"),
    // build: true, // required to use patches
    target: targetNode,
    name: name,
    // loglevel: 'info',Node
    output: `./dist/${targetDir}/${name}`,
    resource: [path.join(__dirname, "./src/**/*")],
  })
    .then(() => {
      console.log("success build for mac");
    })
    .then(() => {
      console.log("adding release files for mac");

      const copyFiles = [
        { name: "config/default.sample.js", option: "" },
        { name: "data/.keep", option: "" },
        { name: "data/shoutOutList.sample.csv", option: "" },
        { name: "sounds/", option: "-r" },
      ];

      copyFiles.forEach((target) => {
        command = `cp ${target.option} ${path.join(
          __dirname,
          target.name
        )} ${path.join(
          __dirname,
          `dist/${targetDir}`,
          target.path || target.name
        )}`;
        console.info(command);
        console.log(execSync(command).toString());
      });
    })
    .then(() => {
      console.log("success output release files for mac");
    });
}

runBuild();
