const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
//check for computer with sburb
  var clientcode = client.charcall.allData(client,userid,charid,"owner");

  var local = client.charcall.charData(client,charid,"local");
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
    let msg = ``;
  if(clientcode=="NONE"){
    msg += `You don't have a CLIENT CODE, Strange!\n`;
    let target = client.charcall.allData(client,userid,charid,"client");
    console.log(target);
    if(target == "NONE"){
    msg+= `You don't seem to be capable of having a client.\n`;
    } else if(target == "NA"){
    msg += `You don't have a client yet. use someone's CLIENT CODE to become their server.\n`
    } else {
    msg += `You have a client, ${client.charcall.allData(client,userid,target,"name")}.\n`
    }
    msg += `You don't seem to be capable of having a server.\n`;
  } else {
      msg += `Your CLIENT CODE is ${clientcode}.\n`;
      if(client.charcall.allData(client,userid,charid,"client")=="NA"){
      msg+=`You don't have a client yet. use someone's CLIENT CODE to become their server.\n`
    } else {
      target = client.charcall.allData(client,userid,charid,"client");
      msg+=`You have a client, ${client.sburbMap.get(target,"name")}.\n`;
    }
      if(client.charcall.allData(client,userid,charid,"server")=="NA"){
      msg+=`You don't have a server yet. Give your CLIENT CODE to another player so they can become your server.\n`
    } else {
      target = client.charcall.allData(client,userid,charid,"server");
      msg+=`You have a server, ${client.sburbMap.get(target,"name")}.\n`;
    }
  }
  msg+=`You can now do ${client.auth.prefix}connect break to reset your server and client.`;
    client.tutorcall.progressCheck(client,message,18,["text",msg]);
    return;
  }

  if(args[0]=="break"){
    if(clientcode=="NONE"){
      let target = client.charcall.allData(client,userid,charid,"client");
      if (target == "NONE"){
        messsage.channel.send("No connections to sever!");
        return;
      }
    }
    if(client.charcall.allData(client,userid,charid,"client")!="NA"){
      target = client.charcall.charGet(client,client.charcall.allData(client,userid,charid,"client"));
      client.charcall.setAnyData(client,userid,target,"NA","server");
      client.funcall.chanMsg(client,target,`${client.charcall.charData(client,charid,"name")} has broken their connection, they are no longer your SERVER!`);
      client.charcall.setAnyData(client,userid,charid,"NA","client");

    }
    if(clientcode!="NONE"&&client.charcall.allData(client,userid,charid,"server")!="NA"){
      target = client.charcall.charGet(client,client.charcall.allData(client,userid,charid,"server"));
      client.charcall.setAnyData(client,userid,target,"NA","client");
      client.funcall.chanMsg(client,target,`${client.charcall.charData(client,charid,"name")} has broken their connection, they are no longer your CLIENT!`);
      client.charcall.setAnyData(client,userid,charid,"NA","server");
    }
    message.channel.send("All connections severed!");
    return;
  }
  clientList = client.landMap.get(`${message.guild.id}medium`,`playerList`);
  if(clientList.indexOf(args[0])==-1){
    message.channel.send("That player is not registered!");
    return;
  }

  //check if clientid is playerid
  if(args[0]==clientcode&&client.configMap.get(message.guild.id).options[4].selection==1){
    message.channel.send(`You cannot be your own server! Send your CLIENT CODE to a friend and have them do the ${client.auth.prefix}connect command with it. Your CLIENT CODE is ${message.author.id}`);
    return;
  }
  targId = client.charcall.charGet(client,args[0]);
if(client.charcall.allData(client,userid,targId,"server")!="NA"){
  if(client.charcall.allData(client,userid,targId,"server")==message.author.id){
    message.channel.send(`You are already this player's server!`);
    return;
  } else {
    message.channel.send(`This player already has a server!`);
    return;
  }
}
if(client.charcall.allData(client,userid,charid,"client")!="NA"&&args[0]!=clientcode){
  let oldclient = client.charcall.charGet(client,client.charcall.allData(client,userid,charid,"client"));
  let msg = "Your server has changed who they connected to, and you no longer have a server!";
  client.charcall.setAnyData(client,userid,oldclient,"NA","server");
  client.funcall.chanMsg(client,oldclient,msg);
}

  client.charcall.setAnyData(client,userid,targId,clientcode,"server");
  client.charcall.setAnyData(client,userid,charid,args[0],"client");
  client.funcall.tick(client,message);
  message.channel.send(`Registered ${client.charcall.charData(client,targId,"name")} as your CLIENT PLAYER`);
  client.funcall.chanMsg(client,targId,`${client.charcall.charData(client,charid,"name")} has connected to you as your SERVER PLAYER`);



}
