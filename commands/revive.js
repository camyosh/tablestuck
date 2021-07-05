
exports.run = (client, message, args) => {

if(client.configMap.get(message.guild.id).options[0].selection!=1){
  message.channel.send("current game config doesn't allow for reviving!");
  return;
}
  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  let local = client.playerMap.get(charid,"local");

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];
  let area = sec[local[1]][local[2]];
  let channelCheck = [];
  let revcheck = false;
  if(!area[2][0][3]==="DREAM BED"&&!client.playerMap.get(charid,"alive")){
    message.channel.send("It seems you are dead! Depending on your game, you might be revived, or you might be gone for good. Have fun!");
    return;
  }
for(let i=0;i<occList.length;i++){
  if(client.playerMap.get(occList[i][1],"type")=="player"&&!client.playerMap.get(occList[i][1],"alive")){
    revcheck = true;
    if(charid==occList[i][1]){
    message.channel.send(`The light around you surges, round-tipped pillars that line the bed glowing. Your body floats up, and you hover in mid-air, adorned in new clothes. They are...comfy.`);
    client.playerMap.set(charid,true,"godtier");
        //removes dreamself from wherever they are and merges the bodies if the player hasn't revived yet
    if(!client.playerMap.get(occList[i][1],"revived")){
      client.playerMap.set(charid,true,"revived");
    let dreamlocal = client.playerMap.get(charid,"dreamlocal");
    let dreamsec = client.landMap.get(dreamlocal[4],dreamlocal[0]);
    let dreamoccList = dreamsec[dreamlocal[1]][dreamlocal[2]][2][dreamlocal[3]][4];
    for(let i=0;i<dreamoccList.length;i++){
      if(dreamoccList[i][1]==charid){
        dreamsec[dreamlocal[1]][dreamlocal[2]][2][dreamlocal[3]][4].splice(i,1);
        client.landMap.set(dreamlocal[4],sec,dreamlocal[0]);
        break;
      }
    }
    client.playerMap.set(charid,local,"dreamlocal");
    const cmd = client.commands.get("loot");
    cmd.run(client,message,args,true);
    if(client.playerMap.get(charid,"armor").length>0){
      sdex = client.playerMap.get(charid,"sdex");
      cardcount = client.playerMap.get(charid,"cards");
      client.playerMap.set(charid,cardcount+1,"cards");
      sdex.push(client.playerMap.get(charid,"armor")[0]);
      client.playerMap.set(charid,sdex,"sdex");
    }
  }
    let aspectList=["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM"];
    let quickKey =[["m","n","o","p","q","r","s","t","u","v","w","x"],["D","C","B","A","9","8","7","6","5","4","3","2"]];
    let aspectIndex =aspectList.indexOf(client.landMap.get(charid,"aspect"));
    client.playerMap.set(charid,[[`GODTIER PAJAMAS`,`s!${quickKey[0][aspectIndex]}${quickKey[1][aspectIndex]}0000`,1,1,[]]],"armor")
    client.playerMap.set(charid,true,"alive");
    client.playerMap.set(charid,client.playerMap.get(charid,"gel"),"vit");


} else {
    if(client.playerMap.get(occList[i][1],"revived")){
      message.channel.send(`it seems ${client.playerMap.get(occList[i][1],"name")} has already been revived, and can't be brought back again, at least not like this.`);
      return;
    }
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
