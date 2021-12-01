
exports.run = (client, message, args) => {

if(client.configMap.get(message.guild.id).options[0].selection!=1){
  message.channel.send("current game config doesn't allow for reviving!");
  return;
}
  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let local = client.charcall.charData(client,charid,"local");

  let sec = client.landMap.get(local[4],local[0]);
  let occList = sec[local[1]][local[2]][2][local[3]][4];
  let area = sec[local[1]][local[2]];
  let channelCheck = [];
  let revcheck = false;

  if(client.funcall.dmcheck(client,message)&&client.configMap.get(message.guild.id).options[6].selection==1){
    if(!args[0]&&!message.mentions.members.first()){
      message.channel.send(`If you are using this command as a player, do ""${client.auth.prefix}revive override". If you're using this as a Author/DM judging a Godtier's fate, ping them to bring them back. Otherwise, let them lay.`);
      return;
    }
    if(message.mentions.members.first()){
      let targuser = message.guild.id.concat(message.mentions.members.first().id);
      let target = client.userMap.get(targuser,"control");
      let godtiered = client.charcall.allData(client,targuser,target,"godtier");
      if(godtiered=="NONE"){
        godtiered = false;
      }
      if(godtiered&&!client.charcall.charData(client,target,"alive")){
        message.channel.send(`Revived ${client.charcall.charData(client,target,"name")}!`);
        client.charcall.setAnyData(client,targuser,target,true,"alive");
        client.charcall.setAnyData(client,targuser,target,client.charcall.allData(client,targuser,target,"gel")*.5,"vit");
        client.funcall.chanMsg(client,target,`Your death has been judged to be unremarkable, congradulations, you get to be alive again. You are too spooked to sleep for a while, though.`);
        client.playerMap.set(target,Date.now(),"sleepTimer");
        return;
      } else {
        message.channel.send("That player doesn't need reviving, or isn't yet Godtier!");
        return;
      }
    }
  }

  let godtiered = client.charcall.allData(client,userid,charid,"godtier");
  if(godtiered=="NONE"){
    godtiered = false;
  }
  if(godtiered&&!client.charcall.charData(client,charid,"alive")&&client.configMap.get(message.guild.id).options[6].selection==0){
      let s = client.charcall.allData(client,userid,charid,"sleepTimer");
      let t = Date.now();
      if(t-s>20000){
        client.charcall.setAnyData(client,userid,charid,true,"alive");
        client.charcall.setAnyData(client,userid,charid,client.charcall.allData(client,userid,charid,"gel")*.5,"vit");
        message.channel.send("You get up off the ground, your wounds mostly healed. You can't think of sleeping for a while either...");
        client.charcall.setAnyData(client,userid,charid,t,"sleepTimer");
      } else {
        message.channel.send(`You try to get up, but your body still needs more rest. It'll be ${Math.ceil((300000-(t-s))/1000)} more seconds, wait a bit longer.`);
      }
    return;
  }

  if(area[2][0][2]!="DREAM BED"&&area[2][0][2]!="SACRIFICIAL SLAB"&&!client.charcall.charData(client,charid,"alive")){
    message.channel.send("It seems you are dead! Depending on your game, you might be revived, or you might be gone for good. Have fun!");
    return;
  }

for(let i=0;i<occList.length;i++){
  if(client.charcall.charData(client,occList[i][1],"type")=="player"&&!client.charcall.charData(client,occList[i][1],"alive")){
    revcheck = true;
    if(charid==occList[i][1]){
      if(godtiered){
        message.channel.send(`You've already reached godtier, you can't do it again! Wait for Fate to decide if you live or die.`);
        return;
      }
      if(area[2][0][2]==="DREAM BED"&&local[4]!=client.charcall.allData(client,userid,charid,"owner")){
        message.channel.send(`Your body lies on the bed, the right kind but the wrong place. You need to be on your own dreambed to come back, it seems.`);
      }
      if(area[2][0][2]==="DREAM BED"&&client.charcall.allData(client,userid,occList[i][1],"revived")){
        message.channel.send(`Your body lies inert on the bed it was meant to become something greater upon. It seems you lack a dreaming self to ascend. Maybe there's another place for you, somewhere.`);
        return;
      } else {
        if(area[2][0][2]==="DREAM BED"){
          message.channel.send(`The light around you surges, round-tipped pillars that line the bed glowing. Your body floats up, and you hover in mid-air, adorned in new clothes. They are...comfy.`);
        } else {
          message.channel.send(`The dark chamber glows as the slab hums with energy. Your body floats up, and you hover in mid-air, adorned in new clothes. They are...comfy. Last chance.`);
        }
    client.charcall.setAnyData(client,userid,charid,true,"godtier");
        //removes dreamself from wherever they are and merges the bodies if the player hasn't revived yet
    if(!client.charcall.allData(client,userid,charid,"revived")){
      client.charcall.setAnyData(client,userid,charid,true,"revived");
    if(client.charcall.allData(client,userid,charid,"dreamer")){
      altself = client.charcall.allData(client,userid,charid,"dreamingID");
    } else {
      altself = client.charcall.allData(client,userid,charid,"wakingID");
    }
    let dreamlocal = client.charcall.charData(client,altself,"local");
    let dreamsec = client.landMap.get(dreamlocal[4],dreamlocal[0]);
    let dreamoccList = dreamsec[dreamlocal[1]][dreamlocal[2]][2][dreamlocal[3]][4];
    for(let i=0;i<dreamoccList.length;i++){
      if(dreamoccList[i][1]==altself){
        dreamsec[dreamlocal[1]][dreamlocal[2]][2][dreamlocal[3]][4].splice(i,1);
        client.landMap.set(dreamlocal[4],dreamsec,dreamlocal[0]);
        break;
      }
    }
    client.charcall.setAnyData(client,userid,altself,local,"local");
    const cmd = client.commands.get("loot");
    cmd.run(client,message,args,true);
    if(client.charcall.charData(client,charid,"armor").length>0){
      sdex = client.charcall.charData(client,charid,"sdex");
      cardcount = client.charcall.charData(client,charid,"cards");
      client.charcall.setAnyData(client,userid,charid,cardcount+1,"cards");
      sdex.push(client.charcall.charData(client,charid,"armor")[0]);
      client.charcall.setAnyData(client,userid,charid,sdex,"sdex");
    }
  }
    let aspectList=["BREATH","LIFE","LIGHT","TIME","HEART","RAGE","BLOOD","VOID","SPACE","MIND","HOPE","DOOM"];
    let quickKey =[["m","n","o","p","q","r","s","t","u","v","w","x"],["D","C","B","A","9","8","7","6","5","4","3","2"]];
    let aspectIndex =aspectList.indexOf(client.landMap.get(local[4],"aspect"));
    client.charcall.setAnyData(client,userid,charid,[[`GODTIER PAJAMAS`,`s!${quickKey[0][aspectIndex]}${quickKey[1][aspectIndex]}0000`,1,1,[]]],"armor")
    client.charcall.setAnyData(client,userid,charid,true,"alive");
    client.charcall.setAnyData(client,userid,charid,client.charcall.allData(client,userid,charid,"gel"),"vit");
    let sburbidArray = client.landMap.get(message.guild.id+"medium","playerList");
    for(let i=0;i<sburbidArray.length;i++){
      destination = client.sburbMap.get(sburbidArray[i],"wakingID");
      altdestination = client.sburbMap.get(sburbidArray[i],"wakingID");
      if(destination!=charid&&altdestination!=charid){
        client.funcall.chanMsg(client,destination,`The sky glows as you see the ${client.landMap.get(local[4],"aspect")} symbol burn in the distance. Someone has ascended.`);
      }
    }
}
} else {
  if(client.charcall.allData(client,userid,occList[i][1],"godtier")){
    message.channel.send(`it seems ${client.charcall.charData(client,occList[i][1],"name")} has ascended to godtier. If they're dead, their life is in Fate's hands now. Nothing you can do.`);
    return;
  }
    if(client.charcall.allData(client,userid,occList[i][1],"revived")){
      message.channel.send(`it seems ${client.charcall.charData(client,occList[i][1],"name")} has already been revived, and can't be brought back again, at least not like this.`);
      return;
    }
      message.channel.send(`Nothing seems to change with ${client.playerMap.get(occList[i][1],"name")}'s body, but you feel like you made a difference.`);

      curuserid = client.charcall.charData(client,occList[i][1],"control");
      dreamer = client.charcall.allData(client,userid,occList[i][1],"dreamer");
      if(!dreamer){
        target = client.charcall.allData(client,userid,occList[i][1],"dreamingID");
      } else {
        target = client.charcall.allData(client,userid,occList[i][1],"wakingID");
      }
      (dreamer?client.charcall.setAnyData(client,userid,occList[i][1],false,"dreamer"):client.charcall.setAnyData(client,userid,occList[i][1],true,"dreamer"));
      if(curuserid.length===0){
        channel = client.charcall.allData(client,userid,occList[i][1],"channel");
        client.channels.cache.get(channel).send(`You have been brought back to life. Whenever you're ready, possess your ${dreamer?`waking`:`dreaming`} self again. You can get your things back by >loot-ing your old body.\n\nEnjoy the second chance.`);
          client.charcall.setAnyData(client,userid,occList[i][1],true,"revived");
        return;
      }
      let targList = client.charcall.charData(client,target,"control");
      for(let i=0;i<curuserid.length;i++){
        targList.push(curuserid[i]);
        client.userMap.set(curuserid[i],target,"possess");
        }
      client.charcall.setAnyData(client,userid,occList[i][1],[],"control");
      client.charcall.setAnyData(client,userid,target,targList,"control");

    client.funcall.chanMsg(client,occList[i][1],`You find yourself waking up again, somewhere else. You can get your things back by >loot-ing your old body.\n\nEnjoy the second chance.`);
  client.charcall.setAnyData(client,userid,occList[i][1],true,"revived");
  }
  }
}
if(!revcheck){
  message.channel.send("There's no one in this room that needs reviving!");
}
}
