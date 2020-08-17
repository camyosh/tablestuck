const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);
  let spec = client.playerMap.get(charid,"spec");

  if(!args[0]){
    message.channel.send("Please select a weapon you would like to switch to. You can see all currently equipped weapons with >SPECIBUS");
    return;
  }

  value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
  }

  if(value >= spec.length || value < 0) {
    message.channel.send("That is not a valid argument!");
    return;
  };

  message.channel.send(`Switching to the ${spec[value][0]}`);
  client.playerMap.set(charid,value,"equip");

}
