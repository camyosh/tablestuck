const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("Only a DM can use this command");
    return;
  }

  const gristTypes = ["build","uranium","amethyst","garnet","iron","marble","chalk","shale","cobalt","ruby","caulk","tar","amber","artifact","zillium","diamond"];

  if(!args[0]){
    message.channel.send(`to use this command, the format is: \n${client.auth.prefix}givegrist [type of grist] [# of grist given] [ping of target player]`);
    return;
  }
  select = parseInt(args[0], 10);
  if(isNaN(select)){
    if(gristTypes.includes(args[0])){
      select = gristTypes.indexOf(args[0]);
    } else {
      message.channel.send("That is not a valid argument");
    }
  }

  value = parseInt(args[1], 10);
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
  }
  if(!message.mentions.members.first()){
    message.channel.send("You must @ a user to target them!");
    return;
  }


  var charid = message.guild.id.concat(message.mentions.members.first().id);
  let grist = client.playerMap.get(charid,"grist");


  grist[select]+=value;

    client.playerMap.set(charid,grist,"grist");

    message.channel.send(`Gave player ${value} ${gristTypes[select]} grist!`);
}
