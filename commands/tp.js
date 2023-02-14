exports.type = "author";
exports.desc = "Teleport to a character";
exports.use = `">tp [player ping]" teleports your character to the character controlled by the person you ping.`;
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
  switch(args[0].toLowerCase()){
  case "home":{
    if(!occset[0]){
      message.channel.send("NPC's don't have a home to teleport to!");
      return;
    }
  client.funcall.move(client,message,charid,local,["h",0,0,0,client.charcall.charData(client,charid,"owner")],false,`Teleporting home!\nEntering a `);
  return;
  }
  case "bf": {
    if(!occset[0]&&args[1]!="confirm"){
      message.channel.send(`Careful, NPCs can't come back from the battlefield easily right now! do ${client.auth.prefix}tp bf confirm to go there anyways!`);
      return;
    }
    client.funcall.move(client,message,charid,local,["bf",5,5,0,`${message.guild.id}medium`],true,`Teleporting to the Battlefield!\nEntering a `);
    return;
  }
  case "p":
    client.funcall.move(client,message,charid,local,["p",5,5,0,`${message.guild.id}medium`],true,`Teleporting to Prospit!\nEntering a `);
    return;
  case "d":
    client.funcall.move(client,message,charid,local,["d",5,5,0,`${message.guild.id}medium`],true,`Teleporting to Derse!\nEntering a `);
    return;
  case "pm":
    client.funcall.move(client,message,charid,local,["pm",5,5,0,`${message.guild.id}medium`],true,`Teleporting to Prospit's moon!\nEntering a `);
    return;
  case "dm":
    client.funcall.move(client,message,charid,local,["dm",5,5,0,`${message.guild.id}medium`],true,`Teleporting to Derse's moon!\nEntering a `);
    return;
  case "pc":
  case "prospitcastle":
    client.funcall.move(client,message,charid,local,["pc",5,5,0,`${message.guild.id}medium`],true,`Teleporting!\nEntering a `);
    return;
  case "dc":
  case "dersecastle":
    client.funcall.move(client,message,charid,local,["dc",5,5,0,`${message.guild.id}medium`],true,`Teleporting!\nEntering a `);
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
