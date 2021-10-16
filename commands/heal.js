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
  var sburbid = client.playerMap.get(charid,"owner")

  let local = client.playerMap.get(charid,"local");
  let enter = client.landMap.get(local[4],"enter");
  let gel = client.sburbMap.get(sburbid,"gel");

  if(local[0]=="h"){
    if(enter==true){
      if(client.sburbMap.get(sburbid,"tutcomplete")){
        message.channel.send("Your Sprite believes in you now, you don't need any little crutch like >heal! You'll be fine.");
        return;
      }
      message.channel.send("You are fully healed by your sprite!");
      client.funcall.tick(client,message);
      client.sburbMap.set(sburbid,gel,"vit");
      client.tutorcall.progressCheck(client,message,38);
    } else {
      message.channel.send("You don't have a sprite to heal you!");
    }
  } else {
    message.channel.send("You can only be healed by your sprite in your house!");
  }
}
