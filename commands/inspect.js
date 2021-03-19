const funcall = require("../modules/funcall.js");
//inspect current area or item
const strifecall = require("../modules/strifecall.js");


const typeList = ["EMPTY","DUNGEON","CONSTRUCT","RETURN NODE","VILLAGE","HOUSE","GATE"];

exports.run = (client, message, args) => {


  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let occList = room[4];
  let dex = room[5];
  const tList = ["MELEE","RANGED","MAGIC","NA"];
//sec[local[1]][local[2]][2][local[3]][5] DEX

  if(!args[0] || args[0] == "page"){
    let page = 0;
    if (args[0]&&args[0] == "page") {
      page = parseInt(args[1], 10) - 1;
      if (isNaN(page)||page<0) {
        message.channel.send("That is not a valid page number!");
        return;
      }
    }

    async function dexCheck(){

    const attachment = await client.imgcall.sdexCheck(client,message,page,args,3,dex,dex.length,room[2]);

      message.channel.send(attachment);
    }

    dexCheck();
    return;
  }


/*if(!args[0]){

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
      occ += `**${client.playerMap.get(occList[j][1],"name")}**\n\n`
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

}*/

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

  async function itemInspect(){
  const attachment = await client.imgcall.inspect(client,message,args,3,dex[value]);

    message.channel.send("Inspecting item",attachment);
  }
  itemInspect()

}
