exports.run = (client, message, args) => {

  if(!client.funcall.dmcheck(client,message)){
    message.channel.send("You must have the SPACE set bonus or be a DM to teleport!");
    return;
  }

  if(!message.mentions.members.first()){
    message.channel.send("You must @ a player to teleport to them!");
    return;
  }

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = client.playerMap.get(charid,"owner");
  let targetid = client.userMap.get(message.guild.id.concat(message.mentions.members.first().id),"possess");

  if(!client.playerMap.has(targetid)){
    message.channel.send("The target is not registered!");
    return;
  }

if(client.strifecall.strifeTest(client,message,message.mentions.members.first())){
  message.channel.send("You can't teleport a player currently in strife!");
  return;
}

  let local = client.playerMap.get(charid,"local");
  //let sec = client.landMap.get(local[4],local[0]);
  //var occset = [true,charid];
  let target = client.playerMap.get(targetid,"local");
  let mapCheck = true;

  if(local[0]=="h"){
    mapCheck=false;
  }

  client.funcall.move(client,message,targetid,target,local,mapCheck,`Teleporting to **${client.playerMap.get(targetid,"name")}**\nEntering a `);

}
