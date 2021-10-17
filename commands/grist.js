const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");


exports.run = (client, message, args) => {

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }
  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  if(client.charcall.npcCheck(userid,charid,"grist")){
  var sburbid = client.playerMap.get(charid,"owner")
  message.channel.send(funcall.gristCacheEmbed(client, sburbid));
  }
  return;
}
