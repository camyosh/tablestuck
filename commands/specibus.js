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

  let spec = client.playerMap.get(charid,"spec");
  let kinds = client.playerMap.get(charid,"kinds");
  let scards = client.playerMap.get(charid,"scards");
  let name = client.playerMap.get(charid,"name");
  let equip = client.playerMap.get(charid,"equip");
  const tList = ["MELEE","RANGED","MAGIC","NA"];

  let msg = ``;
  if(!args[0]){
  let i;
  for(i=0;i<scards && i<16;i++){
    if(i<spec.length){
      msg += `**[${i+1}] ${spec[i][0]} x${spec[i][3]}** \n${spec[i][1]} TIER - ${spec[i][2]}\n\n`
    } else {
      msg += `**[${i+1}] EMPTY**\n\n`
    }
  }

  let eq;

  if(equip<spec.length){
    eq = `**[${equip+1}] ${spec[equip][0]} x${spec[equip][3]}** \n${spec[equip][1]} TIER - ${spec[equip][2]}\n\n`
  } else {
    eq = `**[${equip+1}] EMPTY**\n\n`
  }

  specibusPrint = new client.Discord.MessageEmbed()
  .setTitle(`**${name.toUpperCase()}'S STRIFE SPECIBUS**`)
  .setColor("#00e371")
  .addField(`**STRIFE CARDS**`,`**x${scards}**`,true)
  .addField(`**KIND ABSTRATUS**`,`**${kinds[0]}**`,true)
  .addField(`**CURRENTLY EQUIPPED**`,eq)
  .addField("**SPECIBUS**",msg);
  message.channel.send(specibusPrint);
  return;
}

if(args[0]=="eject") {

  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];

  selectDex = parseInt(args[1], 10) - 1;
  if(isNaN(selectDex)){

    message.channel.send("That is not a valid argument!");
    return;
  }
  if(selectDex >= scards || selectDex< 0){
    message.channel.send("That is not a valid item! Check the list of items in your Sylladex with >sylladex");
    return;
  }
  let dropItem;
  if(selectDex >= spec.length){

    if(scards <= 1) {
      message.channel.send("Cannot eject your last STRIFE CARD!");
      return;
    }

    scards-=1;
    client.playerMap.set(charid,scards,"scards");
    dropItem=["STRIFE CARD","////////",1,1,[]];
  } else {
    dropItem=spec.splice(selectDex,1)[0];
  }
  room[5].push(dropItem);
  sec[local[1]][local[2]][2][local[3]] = room;
  client.landMap.set(land,sec,local[0]);
  client.playerMap.set(charid,spec,"spec");
  client.playerMap.set(charid,0,"equip");
  message.channel.send(`Ejected the ${dropItem[0]}!`);

} else {

value = parseInt(args[0], 10) - 1;
if(isNaN(value)){
  message.channel.send("That is not a valid argument!");
  return;
}

if(value >= spec.length || value < 0) {
  message.channel.send("That is not a valid argument!")
  return;
};

let weaponkind = client.kind[client.codeCypher[0][client.captchaCode.indexOf(spec[value][1].charAt(0))]];
let gristType = client.gristTypes[client.codeCypher[1][client.captchaCode.indexOf(spec[value][1].charAt(1))]];
let trait1 = client.trait1[client.codeCypher[2][client.captchaCode.indexOf(spec[value][1].charAt(2))]];
let trait2 = client.trait2[client.codeCypher[3][client.captchaCode.indexOf(spec[value][1].charAt(3))]];
let action1 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[4][client.captchaCode.indexOf(spec[value][1].charAt(4))]];
let action2 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[5][client.captchaCode.indexOf(spec[value][1].charAt(5))]];
let action3 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[6][client.captchaCode.indexOf(spec[value][1].charAt(6))]];
let action4 = client.action[client.weaponkinds[weaponkind].t][client.codeCypher[7][client.captchaCode.indexOf(spec[value][1].charAt(7))]];

msg = `**TIER -** ${spec[value][2]}  **  QTY -** ${spec[value][3]}\n**KIND - **${weaponkind.toUpperCase()} **TYPE -** ${tList[client.weaponkinds[weaponkind].t]}\n\n**GRIST TYPE -** ${
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
if(spec[value][4].length > 0){
  let i;
  for(i=0;i<spec[value][4].length;i++){
    msg3 += `**[${i+1}] ${spec[value][4][i][0]} x${spec[value][4][i][3]}** \n${spec[value][4][i][1]} TIER - ${spec[value][4][i][2]}\n\n`
  }
} else {
  msg3 = "N/A"
}
inspectItem = new client.Discord.MessageEmbed()
.setTitle(`**${spec[value][0]}**`)
.addField(`**ITEM INFORMATION**`,msg)
.addField(`**ITEM TRAITS**`,msg1)
.addField(`**ITEM ACTIONS**`,msg2)
.addField(`**ITEM INVENTORY**`,msg3)
message.channel.send(inspectItem);

}

}
