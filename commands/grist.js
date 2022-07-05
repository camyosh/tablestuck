
//simple ping command to check if the bot is online.
exports.type = "alchemy";
exports.desc = "Lists grist count";
exports.use = `">grist" displays your current amount of each kind of grist, as well as your current grist cap.`;
exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  if(client.charcall.allData(client,userid,charid,"grist")!="NONE"){
  var sburbid = client.playerMap.get(charid,"owner")
  message.channel.send({embeds: [client.funcall.gristCacheEmbed(client, sburbid)]});
} else {
  message.channel.send("This character doesn't have any grist to check!");
}
  return;
}
