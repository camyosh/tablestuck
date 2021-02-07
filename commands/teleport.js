exports.run = (client, message, args) => {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");

  if(!client.traitcall.traitCheck(client,charid,"SPACE")[1]){
    message.channel.send("You must have the SPACE set bonus to teleport!");
    return;
  }

  if(!message.mentions.members.first()){
    message.channel.send("You must @ a player to teleport to them!");
    return;
  }

  let target = message.mentions.members.first();

  let targetid = message.guild.id.concat(target.id);

  if(!client.funcall.regTest(client,message,target)){
    message.channel.send("The target is not registered!");
  }

  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  var occset = [true,charid];

  let targetLocal = client.playerMap.get(targetid,"local");
  let targetLand = targetLocal[4];
  let targetSec = client.landMap.get(targetLand,targetLocal[0]);

  sec[local[1]][local[2]][2][local[3]][4].splice(sec[local[1]][local[2]][2][local[3]][4].findIndex(occpos => occpos[1] === occset[1]),1);

  targetSec[targetLocal[1]][targetLocal[2]][2][targetLocal[3]][4].push(occset);

  client.landMap.set(targetLand,targetSec,targetLocal[0]);
  client.landMap.set(land,sec,local[0]);
  client.playerMap.set(charid,targetLocal,"local");

  message.channel.send("Teleporting to target!");


}
