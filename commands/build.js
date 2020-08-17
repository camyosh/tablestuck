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

  const gateReq = [200,400,800,1600,3200,6400,12800,25600];

  var charid = message.guild.id.concat(message.author.id);
  var local = client.playerMap.get(charid,"local");
  var room = client.landMap.get(local[4],local[0])[local[1]][local[2]][2][local[3]];
  var currentInv = client.playerMap.get(charid,"sdex");

  let compCheck = funcall.compTest(client,message,charid,room,currentInv);

  if(compCheck[0]==false){
    message.channel.send("To use SBURB commands, you must have an item with the COMPUTER trait either in your Inventory or in the room you are in.");
    return;
  }
  if(compCheck[1]==false){
    message.channel.send("It seems that you have a computer, but you don't have SBURB installed on it!");
    return;
  }

  if(client.playerMap.get(charid,"client") == "NA") {
    message.channel.send("You aren't connected to a client!");
  }

  let clientId = message.guild.id.concat(client.playerMap.get(charid,"client"));


  value = parseInt(args[0], 10);
  if(isNaN(value) || value<1){
    message.channel.send("That is not a valid argument!");
    return;
  }

  let buildSpent = client.landMap.get(clientId,"spent");
  let grist = client.playerMap.get(clientId,"grist");

  if(value > grist[0]) {
    message.channel.send("The Client doesn't have enough Build Grist!");
    return;
  }
  buildSpent += value;
  grist[0] -= value;

  let i;
  let gate = 0;
  let curGate = client.landMap.get(clientId,"gate");
  for(i=0;i<gateReq.length;i++){
    if(buildSpent>=gateReq[i]){
      gate++;
    }
  }

  client.playerMap.set(clientId,grist,"grist");
  client.landMap.set(clientId,buildSpent,"spent");

  if(gate>curGate){

  client.landMap.set(clientId,gate,"gate");
  message.channel.send(`Expended ${value} BUILD GRIST to build house. The CLIENT PLAYER'S house now reaches GATE ${gate}`);
} else {
  message.channel.send(`Expended ${value} BUILD GRIST to build house.`);
}

}
