exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let local = client.charcall.charData(client,charid,"local");

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
}

  listPrint = new client.MessageEmbed()
  .setTitle(`**CHECKING ${client.charcall.charData(client,targId,"name").toUpperCase()}**`)
  .addField(`**NAME**`,`**${client.charcall.charData(client,targId,"name").toUpperCase()}**`,true)
  .addField(`**TYPE**`,`**${client.charcall.charData(client,targId,"type").toUpperCase()}**`,true)
  .addField(`**FACTION**`,`**${client.charcall.charData(client,targId,"faction").toUpperCase()}**`,true)
  .addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.charcall.charData(client,targId,"vit")} / ${client.charcall.allData(client,userid,targId,"gel")}`,true)
  .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.charcall.allData(client,userid,targId,"b")}`,true)
  .addField(`**RUNG**`,`${client.charcall.allData(client,userid,targId,"rung")}`,true)
  .addField(`**BIO**`,`${client.charcall.allData(client,userid,targId,"bio")}`)
  .setImage(client.charcall.allData(client,userid,targId,"img"));
  client.tutorcall.progressCheck(client,message,16,["embed",listPrint]);

}
