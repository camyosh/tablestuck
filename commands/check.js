exports.type = "character";
exports.desc = "Checks character information"
exports.use = `">check" prints information on your own character.
">check [number]" prints information on a character in your current room.`
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
  .addFields(
    {name:`**NAME**`,value:`**${client.charcall.charData(client,targId,"name").toUpperCase()}**`,inline:true},
    {name:`**TYPE**`,value:`**${client.charcall.charData(client,targId,"type").toUpperCase()}**`,inline:true},
    {name:`**FACTION**`,value:`**${client.charcall.charData(client,targId,"faction").toUpperCase()}**`,inline:true},
    {name:`**VITALITY**`,value:`${client.emojis.cache.get(client.emoji["GEL"])} ${client.charcall.charData(client,targId,"vit")} / ${client.charcall.allData(client,userid,targId,"gel")}`,inline:true},
    {name:`**BOONDOLLARS**`,value:`${client.emojis.cache.get(client.emoji["BOONS"])} ${client.charcall.allData(client,userid,targId,"b")}`,inline:true},
    {name:`**RUNG**`,value:`${client.charcall.allData(client,userid,targId,"rung")}`,inline:true},
    {name:`**BIO**`,value:`${client.charcall.allData(client,userid,targId,"bio")}`})
    .setImage(client.charcall.allData(client,userid,targId,"img"));
  client.tutorcall.progressCheck(client,message,16,["embed",listPrint]);

}
