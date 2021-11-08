


exports.run = (client, message, args) => {
  if(!client.funcall.dmcheck(client,message)){
    message.channel.send(`Only someone with a role called "DM" can scratch a session!`);
    return;
  }
if(!client.landMap.has(message.guild.id+"medium")){
  message.channel.send(`You haven't done ${client.auth.prefix}initalize yet, there isn't anything to scratch yet!`);
  return;
}
if(args[0]!="confirm"){
  message.channel.send(`Are you absolutely 100% sure you want to scratch this session? All data and characters that are still within the session will be PERMANENTLY lost! If you're sure, do ${client.auth.prefix}scratch confirm`);
  return;
}

message.channel.send("Scratching session...");

let session = message.guild.id+"medium";

let playerList = client.landMap.get(session,"playerList");
let transList = client.landMap.get(session,"transList");
let npcCount = client.landMap.get(session,"npcCount");

for(let i=0;i<playerList.length;i++){
  //removes player sprite
  if(client.playerMap.has(`n${playerList[i]}`)){
      client.playerMap.delete(`n${playerList[i]}`);
  }
  //deletes player land
  if(client.landMap.has(playerList[i])){
    client.landMap.delete(playerList[i]);
  }
  //deletes waking self & any combats associated
  if(client.playerMap.has(`w${playerList[i]}`)){
    local = client.playerMap.get(`w${playerList[i]}`,"local");
    strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`
    if(client.strifeMap.has(strifeLocal)) client.strifeMap.delete(strifeLocal);
    client.playerMap.delete(`w${playerList[i]}`);
  }
  //deletes dreaming self & any combats associated
  if(client.playerMap.has(`d${playerList[i]}`)){
    local = client.playerMap.get(`d${playerList[i]}`,"local");
    strifeLocal = `${local[0]}/${local[1]}/${local[2]}/${local[3]}/${local[4]}`
    if(client.strifeMap.has(strifeLocal)) client.strifeMap.delete(strifeLocal);
    client.playerMap.delete(`d${playerList[i]}`);
  }
  //deletes sburbdata
  if(client.sburbMap.has(playerList[i])){
    client.sburbMap.delete(playerList[i]);
  }
  //deletes userdata
  if(client.userMap.has(playerList[i].slice(0,36))){
      client.userMap.delete(playerList[i].slice(0,36));
  }
}
//deletes every transportalizer for the session
for(let i=0;i<transList.length;i++){
  if(client.transMap.has(`${message.guild.id}${transList[i]}`)){
    client.transMap.delete(`${message.guild.id}${transList[i]}`)
  }
}
//deletes every npc that belongs to the session
let npcList = client.npcMap.forEach((value,key) => {
  if(key.substring(0,19)===`n${message.guild.id}`){
      client.npcMap.delete(key);
  }
});
//deletes the landmap for the session
client.landMap.delete(session);


message.channel.send("Session and all players PERMANENTLY deleted");
}
