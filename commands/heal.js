const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let local = client.playerMap.get(charid,"local");
  let enter = client.landMap.get(local[4],"enter");
  let gel = client.playerMap.get(charid,"gel");

  if(local[0]=="h"){
    if(enter==true){
      message.channel.send("You are fully healed by your sprite!");
      client.funcall.tick(client,message);
      client.playerMap.set(charid,gel,"vit");
    } else {
      message.channel.send("You don't have a sprite to heal you!");
    }
  } else {
    message.channel.send("You can only be healed by your sprite in your house!");
  }
}
