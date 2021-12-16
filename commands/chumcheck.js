exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  let chumroll = client.charcall.allData(client,userid,charid,"chumroll");
  if(chumroll=="NONE"){
    message.channel.send("You need a chumroll to check up on your chums!");
    return;
  }
  let targId = charid;

if(!args[0]){
  message.channel.send(`Select a chum from your ${client.auth.prefix}chumroll`);
  return;
}

  let value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send(`That is not a valid selection! See a list of chums with ${client.auth.prefix}chumroll`);
    return;
  }

  if(value > chumroll.length-1 || value < 0) {
    message.channel.send(`That is not a valid selection! See a list of chums with ${client.auth.prefix}chumroll`);
    return;
  }
targId = chumroll[value];

listPrint = new client.MessageEmbed()
.setTitle(`**CHECKING ${client.charcall.charData(client,targId,"name").toUpperCase()}**`)
.addField(`**NAME**`,`**${client.charcall.charData(client,targId,"name").toUpperCase()}**`,true)
.addField(`**TYPE**`,`**${client.charcall.charData(client,targId,"type").toUpperCase()}**`,true)
.addField(`**FACTION**`,`**${client.charcall.charData(client,targId,"faction").toUpperCase()}**`,true)
.addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.charcall.charData(client,targId,"vit")} / ${client.charcall.getAnyData(client,userid,targId,"gel")}`,true)
.addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.charcall.getAnyData(client,userid,targId,"b")}`,true)
.addField(`**RUNG**`,`${client.charcall.getAnyData(client,userid,targId,"rung")}`,true)
.addField(`**BIO**`,`${client.charcall.getAnyData(client,userid,targId,"bio")}`)
.setImage(client.charcall.getAnyData(client,userid,targId,"img"));


  message.channel.send({embeds: [listPrint]}).catch(error => {

    listPrint = new client.MessageEmbed()
    .setTitle(`**CHECKING ${client.charcall.charData(client,targId,"name").toUpperCase()}**`)
    .addField(`**NAME**`,`**${client.charcall.charData(client,targId,"name").toUpperCase()}**`,true)
    .addField(`**TYPE**`,`**${client.charcall.charData(client,targId,"type").toUpperCase()}**`,true)
    .addField(`**FACTION**`,`**${client.charcall.charData(client,targId,"faction").toUpperCase()}**`,true)
    .addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.charcall.charData(client,targId,"vit")} / ${client.charcall.getAnyData(client,userid,targId,"gel")}`,true)
    .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.charcall.getAnyData(client,userid,targId,"b")}`,true)
    .addField(`**RUNG**`,`${client.charcall.getAnyData(client,userid,targId,"rung")}`,true)
    message.channel.send({embeds: [listPrint]});
  })

}
