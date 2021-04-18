const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {


  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

  //define variables to determine required grist to reach each gate

  const gateReq = [100,200,400,800,1600,3200,6400,12800];

  //retrieve player location
 
  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  var local = client.playerMap.get(charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];

  //check for computer with sburb installed in room or inventory

  let compCheck = client.traitcall.compTest(client,message,charid,room);

  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

  //if no client player is connected cancel

  if(client.playerMap.get(charid,"client") == "NA") {
    message.channel.send("You aren't connected to a client!");
    return;
  }
  //retrieve clients charid
  let clientId = message.guild.id.concat(client.playerMap.get(charid,"client"));
  //checks if amount spent is greater than amount of grist player has
  let buildSpent = client.landMap.get(clientId,"spent");
  let grist = client.playerMap.get(clientId,"grist");
  let gate = 0;
  let curGate = client.landMap.get(clientId,"gate");
  //convert grist amount to number
  if(!args[0]){
    message.channel.send(`Your client ${(curGate>0?`has access to gate number ${curGate}`:`hasn't reached a gate yet`)}. \nYou have expended ${buildSpent} grist on the house so far, and need to expend ${gateReq[curGate]-buildSpent} more to reach the next gate!`);
    return;
  }
  value = parseInt(args[0], 10);
  if(isNaN(value) || value<1){
    message.channel.send("That is not a valid amount of grist to spend!");
    return;
  }


  if(value > grist[0]) {
    message.channel.send("The Client doesn't have enough Build Grist!");
    return;
  }

  //increases built amount and decreases build grist total


  buildSpent += value;
  grist[0] -= value;

  //check if player has enough grist to reach next gate


  for(let i=0;i<gateReq.length;i++){
    if(buildSpent>=gateReq[i]){
      gate++;
    }
  }

  client.playerMap.set(clientId,grist,"grist");
  client.landMap.set(clientId,buildSpent,"spent");

  //if player can now reach next gate, send message

  client.funcall.tick(client,message);

  if(gate>curGate){

  client.landMap.set(clientId,gate,"gate");
  message.channel.send(`Expended ${value} BUILD GRIST to build house. The CLIENT PLAYER'S house now reaches GATE ${gate}`);
} else {
  message.channel.send(`Expended ${value} BUILD GRIST to build house.`);
}

}
