exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");

  if(!client.funcall.dmcheck(client,message)&&!client.traitcall.traitCheck(client,charid,"SPACE")[1]){
    message.channel.send("You must have the SPACE set bonus or be a DM to teleport!");
    return;
  }

  let local = client.charcall.charData(client,charid,"local");
  let sec = client.landMap.get(local[4],local[0]);
  var occset = [(client.charcall.npcCheck(client,charid)?false:true),charid];
  if(args[0]=="home"){
    if(!occset[0]){
      message.channel.send("NPC's don't have a home to teleport to!");
      return;
    }
  client.funcall.move(client,message,charid,local,["h",0,0,0,local[4]],false,`Teleporting home!\nEntering a `);
  return;
  }


  if(!message.mentions.members.first()){
    message.channel.send("You must @ a player to teleport to them!");
    return;
  }

  let targetid = client.userMap.get(message.guild.id.concat(message.mentions.members.first().id),"possess");

  if(client.charcall.charData(client,targetid,"local")=="NONE"){
    message.channel.send("The target doesn't control a character!");
    return;
  }


  let target = client.charcall.charData(client,targetid,"local");
  let mapCheck = true;

  if(target[0]=="h"){
    mapCheck=false;
  }

  client.funcall.move(client,message,charid,local,target,mapCheck,`Teleporting to **${client.charcall.charData(client,targetid,"name")}**\nEntering a `);

}
