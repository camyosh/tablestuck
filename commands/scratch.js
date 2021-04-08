


exports.run = (client, message, args) => {

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send(`Only someone with a role called "DM" can scratch a session!`);
    return;
  }

if(args[0]=="confirm"){

  message.channel.send("Scratching session...");

  let session = message.guild.id+"medium";

  let playerList = client.landMap.get(session,"playerList");
  let transList = client.landMap.get(session,"transList");
  let npcCount = client.landMap.get(session,"npcCount");

  for(let i=0;i<playerList.length;i++){

    if(client.playerMap.has(`n${playerList[i]}`)){

        client.playerMap.delete(`n${playerList[i]}`);
    }
    if(client.landMap.has(playerList[i])){
      client.landMap.delete(playerList[i]);
    }
    if(client.playerMap.has(playerList[i])){

        client.playerMap.delete(playerList[i]);
    }
  }

  for(let i=0;i<transList.length;i++){
    if(client.transMap.has(`${message.guild.id}${transList[i]}`)){
      client.transMap.delete(`${message.guild.id}${transList[i]}`)
    }
  }

  console.log(npcCount);

  for(let i=0;i<npcCount;i++){

    console.log("Trying to delete NPC");
    if(client.playerMap.has(`n${message.guild.id}/${i}`)){
      console.log("deleting NPC");
        client.playerMap.delete(`n${message.guild.id}/${i}`);

    }
  }

  client.landMap.delete(session);

  message.channel.send("Session and all players PERMANENTLY deleted");

} else {
  message.channel.send(`Are you absolutely 100% sure you want to scratch this session? All data and characters that are still within the session will be PERMANENTLY lost! If you're sure, do ${client.auth.prefix}scratch confirm`);
  return;
}

}
