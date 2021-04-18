const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  var charid = message.guild.id.concat(message.author.id);

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
    message.channel.send(`You must enter a CLIENT CODE to connect to a CLIENT. Your CLIENT CODE is ${message.author.id}`);
    return;
  }

//check if selected client code is a registered player

  if(funcall.clientTest(client, message, args[0]) == false){
    message.channel.send("That player is not registered!");
    return;
  }

  //check if clientid is playerid

  if(args[0]==message.author.id&&true==false){
    message.channel.send(`You cannot be your own server! Send your CLIENT CODE to a friend and have them do the ${client.auth.prefix}connect command with it. Your CLIENT CODE is ${message.author.id}`);
    return;
  }

  var targetId = message.guild.id.concat(args[0]);

  client.playerMap.set(targetId,message.author.id,"server");
  client.playerMap.set(charid,args[0],"client");
  client.funcall.tick(client,message);

  message.channel.send(`Registered ${client.playerMap.get(targetId,"name")} as your CLIENT PLAYER`);



}
