exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  let local = client.charcall.charData(client,charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];
  let occList = room[4];
  let dex = room[5];
  var occset = [!client.charcall.npcCheck(client,charid),charid];


if(!args[0]){
  message.channel.send(`Select a transportalizer in the room. To see a list of transportalizers in the room, do the ${client.auth.prefix}inspect command`);
  return;
}

if(args[0]=="set"){

  if(!args[1]){
    message.channel.send(`Select a transportalizer in the room followed by the code of the target transportalizer you would like to set it's target as!\n\nFor example: ${client.auth.prefix}transportalize set 1 AAAA`);
    return;
  }

  value = parseInt(args[1], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
}

  if(value >= dex.length || value < 0) {
    message.channel.send("That is not a valid argument!")
    return;
  };

  if(dex[value][1].charAt(0)!="@"){
    message.channel.send("The selected item is not a transportalizer!");
    return;
  }

  if(!args[2]){
    message.channel.send(`Enter the code of the Transportalizer your would like to set as this transportalizer's target. \n\nThis Transportalizer's code is ${dex[value][1].substring(4)}`);
    return;
  }

  if(!client.transMap.has(message.guild.id+args[2].toUpperCase)){
    message.channel.send(`No transportalizer with that code exists in this session!`);
    return;
  }

  if(dex[value][1].substring(4)==args[2].toUpperCase){
    message.channel.send("You can't set a transportalizer to target itself!");
    return;
  }

  client.transMap.set(message.guild.id+dex[value][1].substring(4),message.guild.id+args[2].toUpperCase,"target");
  message.channel.send("Set transportalizer target!");
  return;


}

  value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid argument!");
    return;
}

  if(value >= dex.length || value < 0) {
    message.channel.send("That is not a valid argument!")
    return;
  };

  if(dex[value][1].charAt(0)!="@"){
    message.channel.send("The selected item is not a transportalizer!");
    return;
  }

  let target = client.transMap.get(message.guild.id+dex[value][1].substring(4),"target");

  if(target.length==0){
    message.channel.send(`This transportalizer does not have a target set! To set the transportalizer to a target, do ${client.auth.prefix}transportalizer ${value+1} set [target code]\n\n This transportalizer's code is ${dex[value][1].substring(4)}`)
    return;
  }

  if(!client.transMap.has(target)){
    message.channel.send(`This transportalizer's target no longer exists!`);
    return;
  }

  let targetLocal = client.transMap.get(target,"local");

  let targetLand = targetLocal[4];
  let targetSec = client.landMap.get(targetLand,targetLocal[0]);

  sec[local[1]][local[2]][2][local[3]][4].splice(sec[local[1]][local[2]][2][local[3]][4].findIndex(occpos => occpos[1] === occset[1]),1);

  targetSec[targetLocal[1]][targetLocal[2]][2][targetLocal[3]][4].push(occset);

  client.landMap.set(targetLand,targetSec,targetLocal[0]);
  client.landMap.set(land,sec,local[0]);
  client.charcall.setAnyData(client,userid,charid,targetLocal,"local");

  message.channel.send("Transportalizing!");

  //decypher captcha code and convert into weapon information



}
