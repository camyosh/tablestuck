
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
  if(client.playerMap.get(occList[i][1],"vit")<1&&client.playerMap.get(occList[i][1],"type")=="player"){
    revcheck = true;
    if(client.playerMap.get(occList[i][1],"revived")){
      message.channel.send(`it seems ${client.playerMap.get(occList[i][1],"name")} has already been revived, and can't be brought back again, at least not like this.`);
    } else {
      //put whatever reviving stuff goes here.
    }
  }
}
if(!revcheck){
  message.channel.send("There's no one in this room that needs reviving!");
}
}
