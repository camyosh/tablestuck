const funcall = require("../modules/funcall.js");
//displays player's grist total
const strifecall = require("../modules/strifecall.js");

exports.run = (client, message, args) => {
  //check for computer with sburb installed

  var userID = message.guild.id.concat(message.author.id);
  var charid = client.userMap.get(userID,"possess");
  var sburbid = charid.substring(1);

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

  //check if connected to a client

  if(client.sburbMap.get(sburbid,"client") == "NA") {
    message.channel.send("You aren't connected to a client!");
    return;
  }

//retrieve client charid

  let clientId = client.sburbMap.get(sburbid,"client");

  message.channel.send(funcall.gristCacheEmbed(client, clientId));
  client.tutorcall.progressCheck(client,message,20);
  return;
}
