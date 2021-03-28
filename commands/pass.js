const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == false){
    message.channel.send("You're not in Strife!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let local = client.playerMap.get(charid,"local");

  if(strifecall.turnTest(client,message,local)==false){
    message.channel.send("It is not your turn!");
    return;
  }

  message.channel.send("Passing turn...");
  client.strifecall.pass(client,message,local);
  //setTimeout(client.strifecall.pass,3000,client,message,local);
}
