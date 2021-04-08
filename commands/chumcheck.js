exports.run = (client, message, args) => {

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  let chumroll = client.playerMap.get(charid,"chumroll");

  let targId = charid;

if(!args[0]){
  message.channel.send(`Select a chum from your ${client.auth.prefix}chumroll`);
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

  listPrint = new client.Discord.MessageEmbed()
  .setTitle(`**CHECKING ${client.playerMap.get(targId,"name").toUpperCase()}**`)
  .addField(`**NAME**`,`**${client.playerMap.get(targId,"name").toUpperCase()}**`,true)
  .addField(`**TYPE**`,`**${client.playerMap.get(targId,"type").toUpperCase()}**`,true)
  .addField(`**FACTION**`,`**${client.playerMap.get(targId,"faction").toUpperCase()}**`,true)
  .addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.playerMap.get(targId,"vit")} / ${client.playerMap.get(targId,"gel")}`,true)
  .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.playerMap.get(targId,"b")}`,true)
  .addField(`**RUNG**`,`${client.playerMap.get(targId,"rung")}`,true)
  .addField(`**BIO**`,`${client.playerMap.get(targId,"bio")}`)
  .setImage(client.playerMap.get(targId,"img"))


  message.channel.send(listPrint).catch(error => {

    listPrint = new client.Discord.MessageEmbed()
    .setTitle(`**CHECKING ${client.playerMap.get(targId,"name").toUpperCase()}**`)
    .addField(`**NAME**`,`**${client.playerMap.get(targId,"name").toUpperCase()}**`,true)
    .addField(`**TYPE**`,`**${client.playerMap.get(targId,"type").toUpperCase()}**`,true)
    .addField(`**FACTION**`,`**${client.playerMap.get(targId,"faction").toUpperCase()}**`,true)
    .addField(`**VITALITY**`,`${client.emojis.cache.get('735664168400584715')} ${client.playerMap.get(targId,"vit")} / ${client.playerMap.get(targId,"gel")}`,true)
    .addField(`**BOONDOLLARS**`,`${client.emojis.cache.get('735664076180422758')} ${client.playerMap.get(targId,"b")}`,true)
    .addField(`**RUNG**`,`${client.playerMap.get(targId,"rung")}`,true)
    message.channel.send(listPrint);
  })

}
