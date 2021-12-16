
const typeList = ["EMPTY","DUNGEON","CONSTRUCT","RETURN NODE","VILLAGE","HOUSE","GATE"];

exports.run = (client,message,args) =>{

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let local = client.charcall.charData(client,charid,"local");

  let page = 0;
  let pageMax = 1;
  let pageTurn = false;
  let inStrife = client.charcall.charData(client,charid,"strife");


  // Variables for in strife
  let strifeLocal;
  let list;
  let turn;
  let init;
  let active;

  // Variables for out of strife
  let sec;
  let occList;
  let area;
  let room;

  if(inStrife) {
    // Get the data we need for listing in strife and check how many pages we can have
    strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`;
    list = client.strifeMap.get(strifeLocal,"list");
    turn = client.strifeMap.get(strifeLocal,"turn");
    init = client.strifeMap.get(strifeLocal,"init");
    active = client.strifeMap.get(strifeLocal,"active");

    pageMax = Math.ceil(active.length/10);
  } else {
    // The same for out of strife
    sec = client.landMap.get(local[4],local[0]);
    occList = sec[local[1]][local[2]][2][local[3]][4];
    area = sec[local[1]][local[2]];
    room = area[2][local[3]];

    pageMax = Math.ceil(occList.length/10);
  }

  // Check to make sure the page number won't cause a crash
  if(args[0]) {
    page = parseInt(args[0], 10) - 1;
    if(isNaN(page)) {
      message.channel.send("That is not a valid page number!");
      return;
    }

    if(page > pageMax-1 || page < 0) {
      message.channel.send("That is not a valid page number!");
      return;
    }
    pageturn = true;
  }

  if (inStrife) {
    client.strifecall.strifeList(client,local,active,list,turn,init,charid,page,"STRIFE LIST");
  } else {
    let i;
    let msg = ``;

    for(i=0+(page*10);i<((page+1)*10)&&i<occList.length;i++){
      msg+=`**[${i+1}] ${client.charcall.charData(client,occList[i][1],"name").toUpperCase()}** \n *${client.charcall.charData(client,occList[i][1],"type")}*\n\n`
    }

    if(occList.length==0){
      msg= "EMPTY";
    }

    listPrint = new client.MessageEmbed()
    .setTitle(`**ROOM OCCUPANTS**`)
    .addField(`**AREA TYPE**`,`**${typeList[area[0]]}**`,true)
    .addField(`**ROOM**`,`**${room[2]}**`,true)
    .addField(`**PAGE**`,`**${page+1}**`,true)
    .addField(`**CURRENT OCCUPANTS**`,msg)
      client.tutorcall.progressCheck(client,message,2,["embed",listPrint]);
    return;
  }
}
