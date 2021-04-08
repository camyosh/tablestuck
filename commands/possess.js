exports.run = (client, message, args) => {

let charid = message.guild.id.concat(message.author.id);

let local = client.playerMap.get(charid,"local");

let sec = client.landMap.get(local[4],local[0]);
let occList = sec[local[1]][local[2]][2][local[3]][4];

if(client.strifecall.strifeTest(client, message, message.author) == true){
  message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
  return;
}

if(!client.funcall.dmcheck(client,message)){
  message.channel.send("Only a DM can use this command");
  return;
}

if(!args[0]){
  let msg = ``;
  let i;
  for(i=0;i<occList.length;i++){
      msg += `**[${i+1}]** **${client.playerMap.get(occList[i][1],"name").toUpperCase()}**\n\n`
  }
  possessList = new client.Discord.MessageEmbed()
  .setTitle("**POSSESS LIST**")
  .addField(`**CURRENT OCCUPANTS:**`,msg)
  .addField(`**CURRENTLY POSSESSING:**`,`**${client.playerMap.get(client.playerMap.get(charid,"control"),"name")}**\nTo stop possessing, do ${client.auth.prefix}possess cancel`);
  message.channel.send(possessList);

  return;
}

if(args[0]=="cancel"){

let target = client.playerMap.get(charid,"control")


  if(target==charid){
    message.channel.send("You aren't possessing anyone!");
    return;
  }

  let possess = client.playerMap.get(target,"possess");

  possess.splice(possess.indexOf(charid),1);

  message.channel.send(`Stopped possessing ${client.playerMap.get(target,"name").toUpperCase()}!`);

  client.playerMap.set(charid,charid,"control");

  if(client.playerMap.get(target,"type")!="player"&&!possess.length){

    let targLocal = client.playerMap.get(target,"local");
    let targSec = client.landMap.get(local[4],local[0]);

    targSec[targLocal[1]][targLocal[2]][2][targLocal[3]][4].findIndex(occpos => occpos[1] === target)[0]=false;

    console.log(targSec[targLocal[1]][targLocal[2]][2][targLocal[3]][4]);

    client.playerMap.set(targLocal[4],targSec,targLocal[0]);
  }

  client.playerMap.set(target,possess,"possess");

  return;
}

  value = parseInt(args[0], 10) - 1;
  if(isNaN(value)){
    message.channel.send("That is not a valid number!");
    return;
  }

  if(value >= occList.length || value < 0) {
    message.channel.send("That target doesn't exist!")
    return;
  };

  let possess = client.playerMap.get(occList[value][1],"possess");
  if(client.playerMap.get(charid,"control")!=charid&&client.playerMap.get(charid,"control")!=occList[value][1]){
    message.channel.send("You can only possess one player or underling at the same time!");
    return;
  }
  if(client.playerMap.get(charid,"control")==occList[value][1]){
    client.playerMap.set(charid,charid,"control");

    possess.splice(possess.indexOf(charid),1);

    message.channel.send(`Stopped possessing ${client.playerMap.get(occList[value][1],"name").toUpperCase()}!`);
    if(client.playerMap.get(occList[value][1],"type")!="player"&&!possess.length){
      occList[value][0]=false;
    }
  } else {
    client.playerMap.set(charid,occList[value][1],"control");
    possess.push(charid);
    message.channel.send(`Now possessing ${client.playerMap.get(occList[value][1],"name").toUpperCase()}!`);
    occList[value][0]=true;
  }

  sec[local[1]][local[2]][2][local[3]][4]=occList;

  client.playerMap.set(local[4],sec,local[0]);
  client.playerMap.set(occList[value][1],possess,"possess");

}
