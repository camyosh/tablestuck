exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  client.hookcall.hookCheck(client,message);

  if(client.charcall.npcCheck(client,charid)){
    client.userMap.set(userid,message.channel.id,"pesterchannel");
    if(client.charcall.hasData(client,charid,"pesterchannel")){
      client.charcall.setAnyData(client,userid,charid,"peseterchannel");
    }
  } else {
      client.charcall.setAnyData(client,userid,charid,message.channel.id,"pesterchannel");
  }
  message.channel.send("Pesterchum messages will now be recieved in this channel!");

}
