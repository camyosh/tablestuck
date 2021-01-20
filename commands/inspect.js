const funcall = require("../modules/funcall.js");
//inspect current area or item
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {


  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);
  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let occList = room[4];
  let dex = room[5];
  const typeList = ["EMPTY","DUNGEON","CONSTRUCT","RETURN NODE","VILLAGE","HOUSE","GATE"];
  const tList = ["MELEE","RANGED","MAGIC","NA"];

if(!args[0]){

  //if no argument, list information on room
  //Maybe put this within an >inspect room command? That way we can have multiple pages of inventory so messages aren't as long

  let i;
  let j;
  let msg = ``;
  let occ = ``;
  if (dex.length==0) {
    msg = "**EMPTY**";
  } else {
  for(i=0;i<dex.length && i<16;i++){
    msg += `**[${i+1}] ${dex[i][0]} x${dex[i][3]}** \n${dex[i][1]} TIER - ${dex[i][2]}\n\n`
  }
}
//check if occupants are in room
  if(occList<=0){

    occ = `**EMPTY**`

}else{
  //list all occupants in room
  for(j=0;j<occList.length&&j<10;j++){
    if(occList[j][0]==true){
      occ += `**${client.playerMap.get(occList[j][1],"name")}**\n\n`
    } else {
      occ += `**${occList[j][2]} ${occList[j][1]}**\n\n`
    }
  }
}
  sylladexPrint = new client.Discord.MessageEmbed()
  .setTitle(`**INSPECTING AREA**`)
  .addField(`**AREA TYPE**`,`**${typeList[area[0]]}**`,true)
  .addField(`**ROOM**`,`**${room[2]}**`,true)
  .addField(`**CURRENT OCCUPANTS**`,occ.toUpperCase())
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

  //decypher captcha code and convert into weapon information

  client.traitcall.inspectItem(client,dex[value],message);

}
