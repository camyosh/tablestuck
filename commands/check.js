exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = charid.substring(1);

  let local = client.playerMap.get(charid,"local");

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];

  let targId = charid;

if(args[0]){

  let value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send(`That is not a valid selection! See a list of entities in the room with ${client.auth.prefix}list`);
    return;
  }

  if(value > occList.length-1 || value < 0) {
    message.channel.send(`That is not a valid selection! See a list of entities in the room with ${client.auth.prefix}list`);
    return;
  }
targId = occList[value][1];
targSburb = client.playerMap.get(targId,"owner");

}

  listPrint = new client.Discord.MessageEmbed()
  .setTitle(`**CHECKING ${client.playerMap.get(targId,"name").toUpperCase()}**`)
  .addField(`**NAME**`,`**${client.playerMap.get(targId,"name").toUpperCase()}**`,true)
  .addField(`**TYPE**`,`**${client.playerMap.get(targId,"type").toUpperCase()}**`,true)
  .addField(`**FACTION**`,`**${client.playerMap.get(targId,"faction").toUpperCase()}**`,true)
  .addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.playerMap.get(targId,"vit")} / ${client.sburbMap.get(targSburb,"gel")}`,true)
  .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.playerMap.get(targId,"b")}`,true)
  .addField(`**RUNG**`,`${client.sburbMap.get(targSburb,"rung")}`,true)
  .addField(`**BIO**`,`${client.sburbMap.get(targSburb,"bio")}`)
  .setImage(client.sburbMap.get(targSburb,"img"));
  client.tutorcall.progressCheck(client,message,16);


  message.channel.send(listPrint).catch(error => {

    listPrint = new client.Discord.MessageEmbed()
    .setTitle(`**CHECKING ${client.playerMap.get(targId,"name").toUpperCase()}**`)
    .addField(`**NAME**`,`**${client.playerMap.get(targId,"name").toUpperCase()}**`,true)
    .addField(`**TYPE**`,`**${client.playerMap.get(targId,"type").toUpperCase()}**`,true)
    .addField(`**FACTION**`,`**${client.playerMap.get(targId,"faction").toUpperCase()}**`,true)
    .addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.playerMap.get(targId,"vit")} / ${client.sburbMap.get(targSburb,"gel")}`,true)
    .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.playerMap.get(targId,"b")}`,true)
    .addField(`**RUNG**`,`${client.sburbMap.get(targSburb,"rung")}`,true)
    message.channel.send(listPrint);
  })

}
