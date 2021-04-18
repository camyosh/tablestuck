const funcall = require("../modules/funcall.js");
const strifecall = require("../modules/strifecall.js");
//simple ping command to check if the bot is online.

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let spec = client.playerMap.get(charid,"spec");
  let kinds = client.playerMap.get(charid,"kinds");
  let scards = client.playerMap.get(charid,"scards");
  let name = client.playerMap.get(charid,"name");
  let equip = client.playerMap.get(charid,"equip");
  const tList = ["MELEE","RANGED","MAGIC","NA"];

  let msg = ``;

  //if no argument, list all weapons
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
  .addField(`**KIND ABSTRATUS**`,`**${kinds}**`,true)
  .addField(`**CURRENTLY EQUIPPED**`,eq)
  .addField("**SPECIBUS**",msg);
  message.channel.send(specibusPrint);



  return;
}

//eject selected item from specibus

if(args[0]=="eject") {

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

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
    message.channel.send(`That is not a valid item! Check the list of items in your Sylladex with ${client.auth.prefix}sylladex`);
    return;
  }
  let dropItem;
  //if selection is not an item, drop strife card
  if(selectDex >= spec.length){

    if(scards <= 1) {
      message.channel.send("Cannot eject your last STRIFE CARD!");
      return;
    }
    //decrease card count, place strife card in house
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
  client.funcall.tick(client,message);

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

async function itemInspect(){
const attachment = await client.imgcall.inspect(client,message,args,1,spec[value]);

  message.channel.send("Inspecting item",attachment);
}
itemInspect()

}

}
