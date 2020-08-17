const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
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

let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(dex[value][1].charAt(0))]];
let gristType = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(dex[value][1].charAt(1))]];
let trait1 = client.trait1[client.codeCypher[2][client.captchaCode.indexOf(dex[value][1].charAt(2))]];
let trait2 = client.trait2[client.codeCypher[3][client.captchaCode.indexOf(dex[value][1].charAt(3))]];
let action1 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(dex[value][1].charAt(4))]];
let action2 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(dex[value][1].charAt(5))]];
let action3 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(dex[value][1].charAt(6))]];
let action4 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(dex[value][1].charAt(7))]];

msg = `**TIER -** ${dex[value][2]}  **  QTY -** ${dex[value][3]}\n**KIND - **${weaponkind.toUpperCase()} **TYPE -** ${tList[client.weaponkinds[weaponkind].t]}\n\n**GRIST TYPE -** ${
  client.emojis.cache.get(client.grist[gristType].emoji)} ${gristType.toUpperCase()}\n**EFFECTIVE -** ${
  client.emojis.cache.get(client.grist[client.grist[gristType].effective[0]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[1]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[2]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].effective[3]].emoji)
  }\n**INEFFECTIVE -** ${
  client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[0]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[1]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[2]].emoji)}${client.emojis.cache.get(client.grist[client.grist[gristType].ineffective[3]].emoji)
  }`;
msg1 = `**TRAIT 1 -** ${trait1}\n\n**TRAIT 2 -** ${trait2}`;
msg2 = `${client.emojis.cache.get(client.actionList[action1].emoji[0])}${client.emojis.cache.get(client.actionList[action1].emoji[1])}${client.emojis.cache.get(client.actionList[action1].emoji[2])}${client.emojis.cache.get(client.actionList[action1].emoji[3])}${client.emojis.cache.get(client.actionList[action1].emoji[4])
} **CST - **${client.actionList[action1].cst} **DMG - **${client.actionList[action1].dmg}\n${client.actionList[action1].aa}\n\n${
  client.emojis.cache.get(client.actionList[action2].emoji[0])}${client.emojis.cache.get(client.actionList[action2].emoji[1])}${client.emojis.cache.get(client.actionList[action2].emoji[2])}${client.emojis.cache.get(client.actionList[action2].emoji[3])}${client.emojis.cache.get(client.actionList[action2].emoji[4])
  } **CST - **${client.actionList[action2].cst} **DMG - **${client.actionList[action2].dmg}\n${client.actionList[action2].aa
}\n\n${
  client.emojis.cache.get(client.actionList[action3].emoji[0])}${client.emojis.cache.get(client.actionList[action3].emoji[1])}${client.emojis.cache.get(client.actionList[action3].emoji[2])}${client.emojis.cache.get(client.actionList[action3].emoji[3])}${client.emojis.cache.get(client.actionList[action3].emoji[4])
  } **CST - **${client.actionList[action3].cst} **DMG - **${client.actionList[action3].dmg}\n${client.actionList[action3].aa
}\n\n${
  client.emojis.cache.get(client.actionList[action4].emoji[0])}${client.emojis.cache.get(client.actionList[action4].emoji[1])}${client.emojis.cache.get(client.actionList[action4].emoji[2])}${client.emojis.cache.get(client.actionList[action4].emoji[3])}${client.emojis.cache.get(client.actionList[action4].emoji[4])
  } **CST - **${client.actionList[action4].cst} **DMG - **${client.actionList[action4].dmg}\n${client.actionList[action4].aa
}`
let msg3=``;
if(dex[value][4].length > 0){
  let i;
  for(i=0;i<dex[value][4].length;i++){
    msg3 += `**[${i+1}] ${dex[value][4][i][0]} x${dex[value][4][i][3]}** \n${dex[value][4][i][1]} TIER - ${dex[value][4][i][2]}\n\n`
  }
} else {
  msg3 = "N/A"
}
inspectItem = new client.Discord.MessageEmbed()
.setTitle(`**${dex[value][0]}**`)
.addField(`**ITEM INFORMATION**`,msg)
.addField(`**ITEM TRAITS**`,msg1)
.addField(`**ITEM ACTIONS**`,msg2)
.addField(`**ITEM INVENTORY**`,msg3)
message.channel.send(inspectItem);

}
