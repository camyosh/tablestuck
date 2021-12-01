const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {

  //define variables to determine required grist to reach each gate

  const gateReq = [100,200,400,800,1600,3200,6400,12800];

  //retrieve player location

  var userid = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userid,"possess");
  var local = client.charcall.charData(client,charid,"local");
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

  if(client.charcall.allData(client,userid,charid,"client") == "NA"||client.charcall.allData(client,userid,charid,"client") == "NONE") {
    message.channel.send("You aren't connected to a client!");
    return;
  }
  //retrieve clients charid
  let targsburb = client.charcall.allData(client,userid,charid,"client");
  //checks if amount spent is greater than amount of grist player has
  let buildSpent = client.landMap.get(targsburb,"spent");
  let grist = client.sburbMap.get(targsburb,"grist");
  let gate = 0;
  let curGate = client.landMap.get(targsburb,"gate");
  //convert grist amount to number
  if(!args[0]){
    client.tutorcall.progressCheck(client,message,21,["text",`Your client ${(curGate>0?`has access to gate number ${curGate}`:`hasn't reached a gate yet`)}. \nYou have expended ${buildSpent} grist on the house so far, and need to expend ${gateReq[curGate]-buildSpent} more to reach the next gate!`]);
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

  client.sburbMap.set(targsburb,grist,"grist");
  client.landMap.set(targsburb,buildSpent,"spent");

  //if player can now reach next gate, send message

  client.funcall.tick(client,message);

  if(gate>curGate){

  client.landMap.set(targsburb,gate,"gate");
  message.channel.send(`Expended ${value} BUILD GRIST to build house. The CLIENT PLAYER'S house now reaches GATE ${gate}`);
} else {
  message.channel.send(`Expended ${value} BUILD GRIST to build house.`);
}

}
