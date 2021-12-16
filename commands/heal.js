const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {
  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let local = client.charcall.charData(client,charid,"local");
  let enter = client.landMap.get(local[4],"enter");
  let gel = client.charcall.allData(client,userid,charid,"gel");

  if(local[0]=="h"||client.funcall.dmcheck(client,message)){
    if(enter==true||client.funcall.dmcheck(client,message)){
      client.funcall.tick(client,message);
      client.charcall.setAnyData(client,userid,charid,gel,"vit");
      client.tutorcall.progressCheck(client,message,38,["text","You are fully healed by a sprite!"]);
    } else {
      message.channel.send("You don't have a sprite to heal you!");
    }
  } else {
    message.channel.send("You can only be healed by your sprite in your house!");
  }
}
