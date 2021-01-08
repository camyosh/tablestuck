const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);

  let dex = client.playerMap.get(charid,"sdex");
  let modus = client.playerMap.get(charid,"modus");
  let cards = client.playerMap.get(charid,"cards");
  let name = client.playerMap.get(charid,"name");
  const tList = ["MELEE","RANGED","MAGIC","NA"];

  let msg = ``;
  if(!args[0]){
  let i;
  for(i=0;i<cards && i<20;i++){
    if(i<dex.length){
      msg += `**[${i+1}] ${dex[i][0]} x${dex[i][3]}** \n${dex[i][1]} TIER - ${dex[i][2]}\n\n`
    } else {
      msg += `**[${i+1}] EMPTY**\n\n`
    }

  }
  sylladexPrint = new client.Discord.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S SYLLADEX**`)
  .setColor("#ff067d")
  .addField(`**CAPTCHA CARDS**`,`**x${cards}**`,true)
  .addField(`**FETCH MODUS**`,`**${modus}**`,true)
  .addField("**INVENTORY**",msg);
  message.channel.send(sylladexPrint);
  return;
}

value = parseInt(args[0], 10) - 1;
if(isNaN(value)){
  message.channel.send("That is not a valid argument!");
  return;
}

if(value >= dex.length || value < 0) {
  message.channel.send("That is not a valid argument!")
  return;
};

message.channel.send(client.traitcall.inspectItem(client,dex[value]));

}
