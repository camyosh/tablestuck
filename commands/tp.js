exports.run = (client, message, args) => {

  if(client.strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }


  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = client.playerMap.get(charid,"owner");

  if(!client.funcall.dmcheck(client,message)&&!client.traitcall.traitCheck(client,charid,"SPACE")[1]){
    message.channel.send("You must have the SPACE set bonus or be a DM to teleport!");
    return;
  }

  if(!message.mentions.members.first()){
    message.channel.send("You must @ a player to teleport to them!");
    return;
  }

  let targetid = client.userMap.get(message.guild.id.concat(message.mentions.members.first().id),"possess");

  if(!client.playerMap.has(targetid)){
    message.channel.send("The target is not registered!");
    return;
  }

  let local = client.playerMap.get(charid,"local");
  let sec = client.landMap.get(local[4],local[0]);
  var occset = [true,charid];
  let target = client.playerMap.get(targetid,"local");
  let mapCheck = true;

  if(target[0]=="h"){
    mapCheck=false;
  }

  client.funcall.move(client,message,charid,local,target,mapCheck,`Teleporting to **${client.playerMap.get(targetid,"name")}**\nEntering a `);

}
