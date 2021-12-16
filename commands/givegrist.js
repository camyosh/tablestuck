const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("Only a DM can use this command! Make sure to give yourself a role named \"DM\" if you're in charge!");
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

  var userid = message.guild.id.concat(message.mentions.members.first().id);
  var charid = client.userMap.get(userid,"possess");
 if (client.charcall.allData(client,userid,charid,"grist")=="NONE"){
   message.channel.send("This character can't carry grist!");
   return;
 }
  let grist = client.charcall.allData(client,userid,charid,"grist");


  grist[select]+=value;

    client.charcall.setAnyData(client,userid,charid,grist,"grist");

    message.channel.send(`Gave player ${value} ${gristTypes[select]} grist!`);
}
