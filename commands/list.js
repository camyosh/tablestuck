
const typeList = ["EMPTY","DUNGEON","CONSTRUCT","RETURN NODE","VILLAGE","HOUSE","GATE"];

exports.run = (client,message,args) =>{

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let local = client.playerMap.get(charid,"local");

  if(client.strifecall.strifeTest(client, message, message.author) == true){

    let page = 0;

    if(args[0]){
      let value = parseInt(args[0], 10) - 1;
      if(isNaN(value)){
        message.channel.send("That is not a valid page number!");
        return;
      }
      page = value;
    }

    let strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
    let list = client.strifeMap.get(strifeLocal,"list");
    let turn = client.strifeMap.get(strifeLocal,"turn");
    let init = client.strifeMap.get(strifeLocal,"init");
    let active = client.strifeMap.get(strifeLocal,"active");

    client.strifecall.strifeList(client,local,active,list,turn,init,charid,page,"STRIFE LIST");
    return;

  }

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];

  let pagenumber = 0;
  let pageMax = Math.ceil(occList.length/10);
  let pageturn = false;

  if(args[0]){
  let value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid page number!");
    return;
  }

  if(value > pageMax-1 || value < 0) {
    message.channel.send("That is not a valid page number!");
    return;
  }
  pagenumber=value;
  pageturn = true;
  }

  let i;
  let msg = ``;

  for(i=0+(pagenumber*10);i<((pagenumber+1)*10)&&i<occList.length;i++){
    msg+=`**[${i+1}] ${client.playerMap.get(occList[i][1],"name").toUpperCase()}** \n *${client.playerMap.get(occList[i][1],"type")}*\n\n`
  }

  if(occList.length==0){
    msg= "EMPTY";
  }

  listPrint = new client.Discord.MessageEmbed()
  .setTitle(`**ROOM OCCUPANTS**`)
  .addField(`**AREA TYPE**`,`**${typeList[area[0]]}**`,true)
  .addField(`**ROOM**`,`**${room[2]}**`,true)
  .addField(`**PAGE**`,`**${pagenumber+1}**`,true)
  .addField(`**CURRENT OCCUPANTS**`,msg)
  message.channel.send(listPrint);
  return;

}
