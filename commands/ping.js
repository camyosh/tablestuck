const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  var charid = message.guild.id.concat(message.author.id);
  let chan = client.playerMap.get(charid,"channel");
  let ping = client.playerMap.get(charid,"ping");

  client.channels.cache.get(chan).send(`${message.guild.members.cache.get(ping)} Pong!`);

}
