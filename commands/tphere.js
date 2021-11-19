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
  let targetid = client.userMap.get(message.guild.id.concat(message.mentions.members.first().id),"possess");

  if(client.charcall.charData(client,targetid,"local")=="NONE"){
    message.channel.send("The target doesn't control a character!");
    return;
  }

if(client.charcall.charData(client,targetid,"strife")){
  message.channel.send("You can't teleport a player currently in strife!");
  return;
}

  let local = client.charcall.charData(client,charid,"local");
  //let sec = client.landMap.get(local[4],local[0]);
  //var occset = [true,charid];
  let target = client.charcall.charData(client,targetid,"local");
  let mapCheck = true;

  if(local[0]=="h"){
    mapCheck=false;
  }

  client.funcall.move(client,message,targetid,target,local,mapCheck,`Teleporting to **${client.charcall.charData(client,targetid,"name")}**\nEntering a `);

}
