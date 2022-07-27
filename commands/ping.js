//simple ping command to check if the bot is online.
exports.type = "game";
exports.desc ="Checks if the bot is online";
exports.use = `">ping", if the bot is online, will return "PONGERS".`;
exports.run = (client, message, args) => {
  message.channel.send("PONGERS");
}
