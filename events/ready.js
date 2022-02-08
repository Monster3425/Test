const client = require("../index");
const config = require("../config.json");
const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);
client.on("ready", async () => {
  client.user.setActivity(`${config.prefix}help`);
  console.log(`${client.user.username} ✅`);
  console.log(
  );
});
