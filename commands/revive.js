
exports.run = (client, message, args) => {

if(client.configMap.get(message.guild.id).options[0].selection!=1){
  message.channel.send("current game config doesn't allow for reviving!");
  return;
}
  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  let local = client.playerMap.get(charid,"local");

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];
  let channelCheck = [];
  let revcheck = false;
for(let i=0;i<occList.length;i++){
  if(client.playerMap.get(occList[i][1],"type")=="player"&&!client.playerMap.get(occList[i][1],"alive")){
    revcheck = true;
    if(client.playerMap.get(occList[i][1],"revived")){
      message.channel.send(`it seems ${client.playerMap.get(occList[i][1],"name")} has already been revived, and can't be brought back again, at least not like this.`);
    } else {
      message.channel.send(`Nothing seems to change with ${client.playerMap.get(occList[i][1],"name")}'s body, but you feel like you made a difference.`);

      let temp;
      let dreamSwitch=["local","vit","port","kinds","spec","modus","cards","scards","sdex","equip","trinket","armor"];

      for(let j=0;j<dreamSwitch.length;j++){

        temp = client.playerMap.get(occList[i][1],dreamSwitch[j]);
        client.playerMap.set(occList[i][1],client.playerMap.get(occList[i][1],`dream${dreamSwitch[j]}`),dreamSwitch[j]);
        client.playerMap.set(occList[i][1],temp,`dream${dreamSwitch[j]}`);
      }
    (client.playerMap.get(occList[i][1],"dreamer")?client.playerMap.set(occList[i][1],false,"dreamer"):client.playerMap.set(occList[i][1],true,"dreamer"));
    client.playerMap.set(occList[i][1],true,"alive");
    client.funcall.chanMsg(client,occList[i][1],`You find yourself waking up in a comfy room, similar in appearance to your bedroom. You can get your things back by >loot-ing your old body.\n\nEnjoy the second chance.`);
    client.playerMap.set(occList[i][1],true,"revived");
    }
  }
}
if(!revcheck){
  message.channel.send("There's no one in this room that needs reviving!");
}
}
