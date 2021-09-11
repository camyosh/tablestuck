const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var sburbid = charid.substring(1);
//check for computer with sburb

  var local = client.playerMap.get(charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];

  let compCheck = client.traitcall.compTest(client,message,charid,room);

  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

//if no client code is entered, display player's client CODE

  if(!args[0]){
    let msg = `Your CLIENT CODE is ${sburbid}\n`;
    if(client.sburbMap.get(sburbid,"client")=="NA"){
    msg+=`You don't have a client yet. use someone's CLIENT CODE to become their server.\n`
  } else {
    target = client.sburbMap.get(sburbid,"client");
    msg+=`You have a client, ${client.sburbMap.get(target,"name")}.\n`;
  }
      if(client.sburbMap.get(sburbid,"server")=="NA"){
    msg+=`You don't have a server yet. Give your CLIENT CODE to another player so they can become your server.\n`
  } else {
    target = client.sburbMap.get(sburbid,"server");
    msg+=`You have a server, ${client.sburbMap.get(target,"name")}.\n`;
  }
  msg+=`You can now do ${client.auth.prefix}connect break to reset your server and client.`;
  message.channel.send(msg);
    client.tutorcall.progressCheck(client,message,18);
    return;

  }

//check if selected client code is a registered player
  if(args[0]=="break"){
    if(client.sburbMap.get(sburbid,"client")!="NA"){
      client.sburbMap.set(client.sburbMap.get(sburbid,"client"),"NA","server");
      client.funcall.chanMsg(client,message.guild.id.concat(client.sburbMap.get(sburbid,"client")),`${client.sburbMap.get(sburbid,"name")} has broken their connection, they are no longer your SERVER!`);
      client.sburbMap.set(sburbid,"NA","client");

    }
    if(client.sburbMap.get(sburbid,"server")!="NA"){
      client.sburbMap.set(message.guild.id.concat(client.sburbMap.get(sburbid,"server")),"NA","client");
      client.funcall.chanMsg(client,message.guild.id.concat(client.sburbMap.get(sburbid,"server")),`${client.sburbMap.get(sburbid,"name")} has broken their connection, they are no longer your CLIENT!`);
      client.sburbMap.set(sburbid,"NA","server");
    }
    message.channel.send("All connections severed!");
    return;
  }
  if(funcall.clientTest(client, message, args[0]) == false){
    message.channel.send("That player is not registered!");
    return;
  }

  //check if clientid is playerid
  var targetId = message.guild.id.concat(args[0]);
  if(args[0]==message.author.id&&client.configMap.get(message.guild.id).options[4].selection==1){
    message.channel.send(`You cannot be your own server! Send your CLIENT CODE to a friend and have them do the ${client.auth.prefix}connect command with it. Your CLIENT CODE is ${message.author.id}`);
    return;
  }
if(client.sburbMap.get(targetId,"server")!="NA"){
  if(client.sburbMap.get(targetId,"server")==message.author.id){
    message.channel.send(`You are already this player's server!`);
    return;
  } else {
    message.channel.send(`This player already has a server!`);
    return;
  }
}
if(client.sburbMap.get(sburbid,"client")!="NA"&&args[0]!=client.sburbMap.get(sburbid,"client")){
  target = message.guild.id.concat(client.sburbMap.get(sburbid,"client"));
  let msg = "Your server has changed who they connected to, and you no longer have a server!";
  client.sburbMap.set(target,"NA","server");
  client.funcall.chanMsg(client,target,msg);
}

  client.sburbMap.set(targetId,message.author.id,"server");
  client.sburbMap.set(sburbid,args[0],"client");
  client.funcall.tick(client,message);
  message.channel.send(`Registered ${client.sburbMap.get(targetId,"name")} as your CLIENT PLAYER`);
  client.funcall.chanMsg(client,targetId,`${client.sburbMap.get(sburbid,"name")} has connected to you as your SERVER PLAYER`);



}
