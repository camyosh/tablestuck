exports.run = (client, message, args) => {

  var charid = message.guild.id.concat(message.author.id);

  client.hookcall.hookCheck(client,message);

  client.playerMap.set(charid,message.channel.id,"pesterchannel");
  message.channel.send("Pesterchum messages will now be recieved in this channel!");

}
